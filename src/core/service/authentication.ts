import { SECRET } from '@/src/core/secret/secret';
import axios from 'axios';

export class AuthenticationService {
  private BASE_URL = SECRET.BASE_URL;
  private LOGIN_PATH = '/auth/login';
  private REGISTER_PATH = '/auth/register';
  private REQUEST_RESET_PASSWORD_PATH = '/auth/reset-password-otp';
  private VERIFY_OTP_PATH = '/auth/verify-otp';
  private RESET_PASSWORD_PATH = '/auth/reset-password';
  private GET_CURRENT_USER_PATH = '/users/user-details';

  constructor() {}

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.LOGIN_PATH}`, {
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.LOGIN_PATH,
      });
    }
  }

  async register(name: string, email: string, password: string): Promise<any> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.REGISTER_PATH}`, {
        name,
        email,
        password,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.REGISTER_PATH,
      });
    }
  }

  async requestResetPassword(email: string): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}${this.REQUEST_RESET_PASSWORD_PATH}?email=${email}`, {
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.REQUEST_RESET_PASSWORD_PATH,
      });
    }
  }

  async verifyOtp(email: string, otp: string): Promise<any> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.VERIFY_OTP_PATH}`, {
        email,
        otp,
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.VERIFY_OTP_PATH,
      });
    }
  }

  async resetPassword(email: string, newPassword: string, token: string): Promise<any> {
    try {
      const response = await axios.post(`${this.BASE_URL}${this.RESET_PASSWORD_PATH}`, {
        email,
        new_password: newPassword,
        token
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.RESET_PASSWORD_PATH,
      });
    }
  }

  async getCurrentUser(): Promise<any> {
    try {
      const response = await axios.get(`${this.BASE_URL}${this.GET_CURRENT_USER_PATH}`, {
      });

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        return Promise.reject(error.response.data);
      }
      return Promise.reject({
        code: "500",
        message: "Unknown error occurred",
        timestamp: new Date().toISOString(),
        path: this.GET_CURRENT_USER_PATH,
      });
    }
  }

}