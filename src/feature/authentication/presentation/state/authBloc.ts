import { useAuthState } from './authState';
import { AUTH_EVENTS } from './authEvent';
import {
  getCurrentUserUseCase,
  requestResetPasswordUseCase,
  resetPasswordUseCase,
  signInUseCase,
  signUpUseCase,
  verifyOtpUseCase,
} from '@/src/init_dependencies';
import { fold } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Auth } from '@/src/feature/authentication/domain/entity/auth';
import { router } from 'expo-router';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import messages from '@/src/core/constants/messages';
import { SignInUseCaseParams } from '@/src/feature/authentication/domain/use-case/use-sign-in';
import { SignUpUseCaseParam } from '@/src/feature/authentication/domain/use-case/use-sign-up';
import {
  RequestResetPasswordUseCaseParams,
} from '@/src/feature/authentication/domain/use-case/use-request-reset-password';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { VerifyOtpUseCaseParams } from '@/src/feature/authentication/domain/use-case/use-verify-otp';
import { ResetPasswordUseCaseParams } from '@/src/feature/authentication/domain/use-case/use-reset-password';
import { User } from '@/src/feature/authentication/domain/entity/user';

export const authBloc = {
  handleAuthEvent: async (event: string, payload?: any) => {

    switch (event) {
      case AUTH_EVENTS.RESEND_OTP:
        await resendOtpHandler(payload, useAuthState.getState);
        break;
      case AUTH_EVENTS.SIGN_UP:
        await signUpHandler(payload, useAuthState.getState);
        break;
      case AUTH_EVENTS.SIGN_IN:
        await signInHandler(payload, useAuthState.getState);
        break;
      case AUTH_EVENTS.REQUEST_RESET_PASSWORD:
        await requestResetPasswordHandler(payload, useAuthState.getState);
        break;
      case AUTH_EVENTS.VERIFY_OTP:
        await verifyOtpHandler(payload, useAuthState.getState);
        break;
      case AUTH_EVENTS.RESET_PASSWORD:
        await resetPasswordHandler(payload, useAuthState.getState);
        break;
      default:
        break;
    }
  },
};


const signUpHandler = async (
  payload: SignUpUseCaseParam, getState: typeof useAuthState.getState
) => {
  const {setToken, setIsLoading} = getState();

  setIsLoading(true);
  const response = await signUpUseCase.execute(payload);

  fold<Failure, Auth, void>(
    (failure) => {
      setIsLoading(false);
      showToast('error', 'Error!', failure.message || messages.ERROR)
    },
    async (auth) => {
      setToken(auth);
      await getCurrentUserHandler('sign-up', useAuthState.getState);
    }
  )(response)

}

const signInHandler = async (payload: SignInUseCaseParams, getState: typeof useAuthState.getState) => {
  const {setToken, setIsLoading} = getState();

  setIsLoading(true);
  const response = await signInUseCase.execute(payload);

  fold<Failure, Auth, void>(
    (failure) => {
      setIsLoading(false);
      showToast('error', 'Error!', failure.message || messages.ERROR)
    },
    async (auth) => {
      setToken(auth);
      await getCurrentUserHandler('sign-in', useAuthState.getState);
    }
  )(response)

}

const requestResetPasswordHandler = async (payload: RequestResetPasswordUseCaseParams, getState: typeof useAuthState.getState) => {
  const {setIsLoading} = getState();

  setIsLoading(true);
  const response = await requestResetPasswordUseCase.execute(payload);

  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsLoading(false);
      showToast('error', 'Error!', failure.message || messages.ERROR)
    },
    () => {
      setIsLoading(false);
      router.replace({ pathname: "/authentication/otp", params: { email: payload.email } })
      showToast('success', 'Success!', messages.REQUEST_RESET_PASSWORD_SUCCESS)
    }
  )(response)

}


const verifyOtpHandler = async (payload: VerifyOtpUseCaseParams, getState: typeof useAuthState.getState) => {
  const {setIsLoading} = getState();

  setIsLoading(true);
  const response = await verifyOtpUseCase.execute(payload);

  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsLoading(false);
      showToast('error', 'Error!', failure.message || messages.ERROR)
    },
    () => {
      setIsLoading(false);
      router.replace({ pathname: "/authentication/reset-password", params: { email: payload.email , otp: payload.otp} })
      showToast('success', 'Success!', messages.VERIFY_OTP_SUCCESS)
    }
  )(response)

}

const resetPasswordHandler = async (payload: ResetPasswordUseCaseParams, getState: typeof useAuthState.getState) => {
  const {setIsLoading} = getState();

  setIsLoading(true);
  const response = await resetPasswordUseCase.execute(payload);

  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsLoading(false);
      showToast('error', 'Error!', failure.message || messages.ERROR)
    },
    () => {
      setIsLoading(false);
      router.replace("/authentication/welcome");
      showToast('success', 'Success!', messages.RESET_PASSWORD_SUCCESS)
    }
  )(response)

}

const resendOtpHandler = async ({email}: { email: string }, getState: typeof useAuthState.getState) => {
  const {setIsLoading} = getState();

  setIsLoading(true);
  const response = await requestResetPasswordUseCase.execute({email});

  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsLoading(false);
      showToast('error', 'Error!', failure.message || messages.ERROR)
    },
    () => {
      setIsLoading(false);
      showToast('success', 'Success!', messages.REQUEST_RESET_PASSWORD_SUCCESS)
    }
  )(response)
};

const getCurrentUserHandler = async (handlerType: 'sign-in' | 'sign-up', getState: typeof useAuthState.getState) => {
  const {setUser, setIsLoading} = getState();

  setIsLoading(true);
  const response = await getCurrentUserUseCase.execute();

  fold<Failure, User, void>(
    (failure) => {
      setIsLoading(false);
      showToast('error', 'Error!', failure.message || messages.ERROR)
    },
    (user) => {
      setIsLoading(false);

      if(handlerType === 'sign-in'){
        showToast('success', 'Success!', messages.SIGN_IN_SUCCESS)
      } else {
        showToast('success', 'Success!', messages.SIGN_UP_SUCCESS)
      }

      router.replace("/(tabs)")
      setUser(user);
      setIsLoading(false);
    }
  )(response)
};
