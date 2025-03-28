import { useForm } from 'react-hook-form';
import { accountResetPasswordSchema, accountSchema } from '@/src/core/validation/account-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { accountBloc } from '@/src/feature/account/presentation/state/accountBloc';
import { useEffect } from 'react';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { useAccountState } from '@/src/feature/account/presentation/state/accountState';
import ACCOUNT_EVENTS from '@/src/feature/account/presentation/state/accountEvent';
import { router } from 'expo-router';
import { Linking } from 'react-native';


const useAccount = () => {
  const {user} = useAuthState();
  const currencyList = useAccountState((state) => state.currencyList);
  const formattedCurrencies = currencyList.sort(
    (a,b) => a.name.localeCompare(b.name)).map((currency) => ({id: currency.id, label: currency.name, value: currency.name}));

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
    await userUpdate.handleSubmit(async (data) => {
      try {
        await accountBloc.handleAccountEvent(ACCOUNT_EVENTS.UPDATE_USER, {data, userId: user?.id});
        router.back();
      } catch (e) {
        console.log("Error updating user: ", e)
      }
    })()
  }

  const updateUserPasswordHandler = async () => {
    await userResetPassword.handleSubmit(async (data) => {
      try {
        await accountBloc.handleAccountEvent(ACCOUNT_EVENTS.RESET_USER_PASSWORD, { data, userId: user?.id });
        userResetPassword.reset(userResetPassword.formState.defaultValues);
        router.back();
      } catch (e) {
        console.log("Error updating user: ", e)
      }
    })()
  }

  // Support
  const openEmailApp = () => {
    const supportEmail = "support@example.com"; // Replace with your support email
    const subject = encodeURIComponent("Help & Support Request");
    const body = encodeURIComponent("Hello, I need help with...");

    const mailtoUrl = `mailto:${supportEmail}?subject=${subject}&body=${body}`;

    Linking.canOpenURL(mailtoUrl)
      .then((supported) => {
        if (supported) {
          Linking.openURL(mailtoUrl);
        } else {
          alert( "No email app found on your device.");
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };


  // effects
  useEffect(() => {
    (async () => {
      try {
        await accountBloc.handleAccountEvent(ACCOUNT_EVENTS.FETCH_CURRENCIES, {});
      } catch (e) {
        console.log("Error fetching currencies: ", e)
      }
    })()
  }, []);



  return {
    userUpdate,
    userResetPassword,
    updateUserHandler,
    updateUserPasswordHandler,
    formattedCurrencies,
    openEmailApp
  }

}

export default useAccount;