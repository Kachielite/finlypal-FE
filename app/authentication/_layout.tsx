import { Redirect, Stack } from 'expo-router';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import React from 'react';

export default function AuthLayout() {
  const {token} = useAuthState.getState()

  if(token) {
    return <Redirect href="/(tabs)"/>
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="request-reset-password" />
      <Stack.Screen name="reset-password" />
    </Stack>
  );
}