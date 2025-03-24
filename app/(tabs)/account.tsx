import React from 'react';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import AccountScreen from '@/src/feature/account/presentation/screens/AccountScreen';

const Account = () => {
  const {token, user} = useAuthState.getState()

  if(!token || !user) {
    return <WelcomeScreen/>
  }

  return <AccountScreen/>
};
export default Account;
