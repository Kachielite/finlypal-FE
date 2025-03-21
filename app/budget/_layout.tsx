import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { Redirect, Stack } from 'expo-router';
import React from 'react';

export default function BudgetLayout() {
  const {token} = useAuthState.getState()

  if(!token) {
    return <Redirect href="/authentication/welcome"/>
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="[budget_id]" />
    </Stack>
  );
}