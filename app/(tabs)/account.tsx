import { SafeAreaView, Text } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import Button from '@/src/shared/presentation/components/form/button';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';

const Account = () => {
  const {token, isLoading, logout, user} = useAuthState.getState()

  if(!token || !user) {
    return <WelcomeScreen/>
  }

  return (
    <SafeAreaView>
      <Text>Welcome to {user.name}</Text>
      <Button onPress={() => {
        logout()
        router.push("/welcome")
      }} label="Log out" type="primary" isLoading={isLoading} />
    </SafeAreaView>
  );
};
export default Account;
