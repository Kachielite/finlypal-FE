import { useAccountState } from '@/src/feature/account/presentation/state/accountState';
import { getCurrenciesUseCase, resetPasswordUserUseCase, updateAccountUseCase } from '@/src/init_dependencies';
import { fold } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import messages from '@/src/core/constants/messages';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { User } from '@/src/feature/account/domain/entity/user';
import { ResetPasswordUserUseCaseParams } from '@/src/feature/account/domain/use-case/use-reset-user-password';
import { Currency } from '@/src/feature/account/domain/entity/currency';
import { NoParams } from '@/src/core/use-case/use-case';
import ACCOUNT_EVENTS from '@/src/feature/account/presentation/state/accountEvent';
import { accountSchema } from '@/src/core/validation/account-validation';
import { UpdateUserUseCaseParams } from '@/src/feature/account/domain/use-case/use-update-user';

export const accountBloc = {
  handleAccountEvent: async (event: string, payload: any) => {
    switch (event) {
      case ACCOUNT_EVENTS.UPDATE_USER:
        await updateAccountHandler(payload, useAccountState.getState, useAuthState.getState);
        break;
      case ACCOUNT_EVENTS.RESET_USER_PASSWORD:
        await updateAccountPasswordHandler(payload, useAccountState.getState);
        break;
      case ACCOUNT_EVENTS.FETCH_CURRENCIES:
        await fetchCurrenciesHandler(payload, useAccountState.getState);
        break;
      default:
        break
    }
  },
}

const updateAccountHandler = async (
  payload: {data: typeof accountSchema._type, userId: number}, getState: typeof useAccountState.getState, authGetState: typeof useAuthState.getState
) => {

  const {setIsModifyingUser} = getState();
  const {setUser} = authGetState()


  setIsModifyingUser(true);
  const response = await updateAccountUseCase.execute(new UpdateUserUseCaseParams(payload.data, payload.userId));

  fold<Failure, User, void>(
    (failure) => {
      setIsModifyingUser(false);
      showToast('error', 'Error!', failure.message || messages.UPDATE_ACCOUNT_FAILED)
    },
    (user) => {
      setUser(user);
      setIsModifyingUser(false);
      showToast('success', 'Success!', messages.UPDATE_ACCOUNT_SUCCESS)
    }
  )(response)
}

const updateAccountPasswordHandler = async (
  payload: ResetPasswordUserUseCaseParams, getState: typeof useAccountState.getState
) => {
  const {setIsModifyingUser} = getState();

  setIsModifyingUser(true);
  const response = await resetPasswordUserUseCase.execute(new ResetPasswordUserUseCaseParams(payload.data, payload.userId));

  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsModifyingUser(false);
      showToast('error', 'Error!', failure.message || messages.RESET_USER_PASSWORD_FAILED)
    },
    () => {
      setIsModifyingUser(false);
      showToast('success', 'Success!', messages.REQUEST_RESET_PASSWORD_SUCCESS)
    }
  )(response)
}

const fetchCurrenciesHandler = async (
  payload:NoParams, getState: typeof useAccountState.getState
) => {
  const {setCurrencyList} = getState();
  const response = await getCurrenciesUseCase.execute(payload);

  fold<Failure, Currency[], void>(
    (failure) => {
      console.error("fetchCurrenciesHandler", failure.message || "Error fetching currencies")
    },
    (currencies) => {
      setCurrencyList(currencies);
    }
  )(response)
}