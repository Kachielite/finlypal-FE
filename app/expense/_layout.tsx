import React from 'react';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { Redirect, Stack } from 'expo-router';

const AddLayout = () => {
  const {token} = useAuthState.getState()

  if(!token) {
    return <Redirect href="/authentication/welcome"/>
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="add-expense" />
    </Stack>
  );
};
export default AddLayout;
