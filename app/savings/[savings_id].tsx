import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SavingScreen from '@/src/feature/savings/presentation/screens/SavingScreen';

const Budget = () => {
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SavingScreen />
    </GestureHandlerRootView>
  )
}

export default Budget
