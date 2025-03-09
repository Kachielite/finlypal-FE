import React from 'react';
import ExpensesScreen from '@/src/feature/expenses/presentation/screens/ExpensesScreen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Expense = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ExpensesScreen />
    </GestureHandlerRootView>
  );
};
export default Expense;
