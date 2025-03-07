import React from 'react';
import HomeScreen from '@/src/feature/home/presentation/screens/HomeScreen';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';

const Home = () => {
  const {token} = useAuthState.getState()

  if(!token) {
    return <WelcomeScreen/>
  }

  return <HomeScreen />
};
export default Home;

