import React from 'react';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import AccountScreen from '@/src/feature/account/presentation/screens/AccountScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Account = () => {
  const {token, user} = useAuthState.getState()

  if(!token || !user) {
    return <WelcomeScreen/>
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AccountScreen />
    </GestureHandlerRootView>
  )

};
export default Account;
