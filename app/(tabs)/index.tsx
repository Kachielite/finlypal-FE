import React from 'react';
import HomeScreen from '@/src/feature/home/presentation/screens/HomeScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Home = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HomeScreen />
    </GestureHandlerRootView>
  );
};
export default Home;

