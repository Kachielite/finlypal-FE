import React from 'react';
import BudgetItemScreen from '@/src/feature/budget-item/presentation/screens/BudgetItemScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const BudgetItemId = () => {
  return(
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BudgetItemScreen/>
    </GestureHandlerRootView>
  )
}

export default BudgetItemId
