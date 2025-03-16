import React from 'react';
import BudgetScreen from '@/src/feature/budget/presentation/screens/BudgetScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Budget = () => {
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BudgetScreen />
    </GestureHandlerRootView>
  )
}

export default Budget
