import { useAuthState } from './authState';
import { AUTH_EVENTS } from './authEvent';
import {
  requestResetPasswordUseCase,
  resetPasswordUseCase,
  signInUseCase,
  signUpUseCase,
  verifyOtpUseCase
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
  RequestResetPasswordUseCaseParams
} from '@/src/feature/authentication/domain/use-case/use-request-reset-password';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { VerifyOtpUseCaseParams } from '@/src/feature/authentication/domain/use-case/use-verify-otp';
import { ResetPasswordUseCaseParams } from '@/src/feature/authentication/domain/use-case/use-reset-password';

export const authBloc = {
  handleAuthEvent: async (event: string, payload?: any) => {

    switch (event) {
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


const signUpHandler = async (payload: SignUpUseCaseParam, getState: typeof useAuthState.getState) => {
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
      router.push("/(tabs)")
      showToast('success', 'Success!', messages.SIGN_UP_SUCCESS)
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
    (auth) => {
      setToken(auth);
      setIsLoading(false);
      router.push("/(tabs)")
      showToast('success', 'Success!', messages.SIGN_IN_SUCCESS)
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
      router.push("/otp")
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
      router.push("/reset-password")
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
      router.push("/sign-in")
      showToast('success', 'Success!', messages.RESET_PASSWORD_SUCCESS)
    }
  )(response)

}