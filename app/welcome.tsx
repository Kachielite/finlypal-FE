import React from 'react';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';

export default function Welcome() {
  const {token} = useAuthState.getState()

  if(token) {
    return <WelcomeScreen/>
  }

  return <WelcomeScreen/>
}
