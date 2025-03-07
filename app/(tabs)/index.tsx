import React from 'react';
import HomeScreen from '@/src/feature/home/presentation/screens/HomeScreen';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { Redirect } from 'expo-router';

const Home = () => {
  const {token} = useAuthState.getState()

  if(!token) {
    return <Redirect href="/authentication/welcome"/>
  }

  return <HomeScreen />
};
export default Home;

