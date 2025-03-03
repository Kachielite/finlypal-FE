import { useAuthState } from './authState';
import { AUTH_EVENTS } from './authEvent';
import { signUpUseCase } from '@/src/init_dependencies';
import { fold } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Auth } from '@/src/feature/authentication/domain/entity/auth';
import { router } from 'expo-router';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import messages from '@/src/core/constants/messages';

export const authBloc = {
  handleAuthEvent: async (event: string, payload?: any) => {

    switch (event) {
      case AUTH_EVENTS.SIGN_UP:
        await signUpHandler(payload, useAuthState.getState);
        break;
      default:
        break;
    }
  },
};


const signUpHandler = async (payload: {name: string, email: string, password: string}, getState: typeof useAuthState.getState) => {
  const {setToken, setIsLoading} = getState();

  setIsLoading(true);

  const response = await signUpUseCase.execute(payload);

  fold<Failure, Auth, void>(
    (failure) => {
      setIsLoading(false);
      showToast('error', 'Error!', failure.message || messages.ERROR)
    },
    (auth) => {
      setToken(auth);
      setIsLoading(false);
      router.push("/")
      showToast('error', 'Success!', messages.SIGN_UP_SUCCESS)
    }
  )(response)

}