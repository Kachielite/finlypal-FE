import React from 'react';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import Home from '@/app/(tabs)';

export default function Welcome() {
  const {token} = useAuthState.getState()

  if(token) {
    return <Home/>
  }

  return <WelcomeScreen/>
}
