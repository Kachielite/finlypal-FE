import { SafeAreaView, Text } from 'react-native';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import React from 'react';

const HomeScreen = () => {
  const {token, user} = useAuthState.getState()

  if(!token || !user) {
    return <WelcomeScreen/>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
      <Text>HomeScreen</Text>
      </SafeAreaView>
  );
};
export default HomeScreen;
