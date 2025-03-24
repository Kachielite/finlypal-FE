import axios from 'axios';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { SECRET } from '@/src/core/secret/secret';
import { router } from 'expo-router';
import { suppressAllToasts } from '@/src/shared/presentation/components/toastProvider';


const customAxios = axios.create({
  baseURL: SECRET.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

let isRefreshing = false;
let refreshSubscribers: ((token: string) => void)[] = [];

const addRefreshSubscriber = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

const onRefreshed = (newToken: string) => {
  refreshSubscribers.forEach((callback) => callback(newToken));
  refreshSubscribers = [];
};

const refreshAccessToken = async () => {
  const { token, setToken, logout } = useAuthState.getState(); // Access Zustand store directly
  if (!token?.refresh_token) {
    suppressAllToasts(true); // Prevent any toasts from showing
    logout();
    router.replace("/authentication/welcome");
    return null;
  }

  try {
    const response = await axios.post(`${SECRET.BASE_URL}/auth/refresh-token`, null, {
      headers: {
        Authorization: `Bearer ${token.refresh_token}`,
      },
    });

    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;

    // Update Zustand state with new tokens
    setToken({ access_token: newAccessToken, refresh_token: newRefreshToken });

    // Notify all queued requests
    onRefreshed(newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Token refresh failed", error);
    logout();
    return null;
  }
};

// ** Request Interceptor **
customAxios.interceptors.request.use(async (config) => {
  const { token } = useAuthState.getState();

  if (token?.access_token) {
    config.headers.Authorization = `Bearer ${token.access_token}`;
  }

  return config;
});

// ** Response Interceptor **
customAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          addRefreshSubscriber((newToken) => {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            resolve(customAxios(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const newToken = await refreshAccessToken();
      isRefreshing = false;

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return customAxios(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default customAxios;