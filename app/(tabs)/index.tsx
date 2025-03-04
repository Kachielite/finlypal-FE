import { View, Text, SafeAreaView } from 'react-native';
import React from 'react';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import Button from '@/src/shared/presentation/form/button';
import { router } from 'expo-router';

const Index = () => {
  const {token, setToken, isLoading} = useAuthState.getState()

  if(!token) {
    return <WelcomeScreen/>
  }

  return (
    <SafeAreaView>
      <Text>Welcome to home</Text>
      <Button onPress={() => {
        setToken(null);
        router.push("/welcome")
      }} label="Log out" type="primary" isLoading={isLoading} />
    </SafeAreaView>
  );
};
export default Index;
