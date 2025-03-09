import TabLayout from '@/src/shared/presentation/layouts/TabLayout';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import { Redirect } from 'expo-router';
import React from 'react';

const TabsLayout = () => {
  const {token} = useAuthState.getState()

  if(!token) {
    return <Redirect href="/authentication/welcome"/>
  }
  
  return <TabLayout />;
};
export default TabsLayout;
