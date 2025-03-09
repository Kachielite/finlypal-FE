import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import useExpense, { expenseType } from '@/src/feature/expenses/presentation/state/useExpense';


const QuickActions = ({createModalRef}: {createModalRef: any}) => {
  const setModalType = useExpenseState((state) => state.setModalType);
  const {resetExpenseForm, setValueExpense, watchExpense} = useExpense();

  const openCreateModal = (type: 'expense' | 'income') => {
    setModalType('add')
    setValueExpense('type', type === 'expense' ? expenseType[0] : expenseType[1])
    createModalRef.current?.open()
  }


  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <Text className="text-white font-urbanist-bold text-[20px]">Quick Actions</Text>
      <View className="flex-row justify-between mt-2 w-full gap-x-[12px]">
        {/* Add Income Button */}
        <TouchableOpacity onPress={() => openCreateModal('income')} className="flex-1 flex-row items-center justify-center bg-green-500 rounded-lg py-4 mr-2">
          <ArrowUp size={20} strokeWidth={4} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Add Income</Text>
        </TouchableOpacity>

        {/* Add Expense Button */}
        <TouchableOpacity onPress={() => openCreateModal('expense')} className="flex-1 flex-row items-center justify-center bg-red-500  rounded-lg py-4 ml-2 ">
          <ArrowDown size={20} strokeWidth={4} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default QuickActions;


