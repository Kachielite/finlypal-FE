import { useForm } from 'react-hook-form';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountBloc } from '@/src/feature/account/presentation/state/accountBloc';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { useAccountState } from '@/src/feature/account/presentation/state/accountState';

const useAccount = () => {
  const {user} = useAuthState();
  const currencyList = useAccountState((state) => state.currencyList);
  const formattedCurrencies = currencyList.map((currency) => ({id: currency.id, label: currency.name, value: currency.name}));

  // account forms
  const userUpdate = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: user?.name,
      currency: {id: Number(user?.currency?.id), label: user?.currency?.name, value: user?.currency?.name},
    }
  });

  const userResetPassword = useForm({
    resolver: zodResolver(accountResetPasswordSchema),
    defaultValues: {
      old_password: '',
      new_password: '',
      confirmPassword: ''
    }
  });

  // account event handlers
  const updateUserHandler = async () => {
    userUpdate.handleSubmit(async (data) => {
      try {
        await accountBloc.handleAccountEvent(ACCOUNT_EVENTS.UPDATE_USER, data);
        userUpdate.reset(userUpdate.formState.defaultValues);
        router.back()
      } catch (e) {
        console.log("Error updating user: ", e)
      }
    })
  }

  const updateUserPasswordHandler = async () => {
    userResetPassword.handleSubmit(async (data) => {
      try {
        await accountBloc.handleAccountEvent(ACCOUNT_EVENTS.RESET_USER_PASSWORD, data);
        userResetPassword.reset(userResetPassword.formState.defaultValues);
        router.back()
      } catch (e) {
        console.log("Error updating user: ", e)
      }
    })
  }


  // effects
  useEffect(() => {
    (async () => {
      await accountBloc.handleAccountEvent(ACCOUNT_EVENTS.FETCH_CURRENCIES, {});
    })()
  }, []);



  return {
    userUpdate,
    userResetPassword,
    updateUserHandler,
    updateUserPasswordHandler,
    formattedCurrencies
  }

}

export default useAccount;