import { useAuthState } from './authState';
import { AUTH_EVENTS } from './authEvent';

export const authBloc = {
  handleAuthEvent: (event: string, payload?: any) => {
    const { setToken, setUser, logout } = useAuthState.getState();

    switch (event) {
      case AUTH_EVENTS.SIGN_UP:

        break;
      default:
        break;
    }
  },
};


const signUpHandler = async (payload: any) => {
  const { setToken, setUser, setIsLoading } = useAuthState.getState();

  setIsLoading(true);
  const response = await sign
}