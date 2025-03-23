import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import useExpense, { expenseType } from '@/src/feature/expenses/presentation/state/useExpense';
import { ArrowDown, ArrowUp, ChartPieIcon, PiggyBankIcon } from 'lucide-react-native';


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
      <View className="flex flex-row justify-between w-full">
        <TouchableOpacity onPress={() => openCreateModal('income')} className="flex items-center gap-y-2.5">
          <View className="p-5 bg-green-500 rounded-lg size-[60px] flex justify-center items-center">
            <ArrowUp size={34} strokeWidth={3} color="white" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm font-urbanist-bold">Income</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openCreateModal('income')} className="flex items-center gap-y-2.5">
          <View className="p-5 bg-red-500 rounded-lg size-[60px] flex justify-center items-center">
            <ArrowDown size={34} strokeWidth={3} color="white" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm font-urbanist-bold">Expense</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openCreateModal('income')} className="flex items-center gap-y-2.5">
          <View className="p-5 bg-[#0D9488] rounded-lg size-[60px] flex justify-center items-center">
            <PiggyBankIcon size={34} strokeWidth={2} color="white" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm font-urbanist-bold">Savings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openCreateModal('income')} className="flex items-center  gap-y-2.5">
          <View className="p-5 bg-[#007BFF] rounded-lg size-[60px] flex justify-center items-center">
            <ChartPieIcon size={34} strokeWidth={2} color="white" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm font-urbanist-bold">Budget</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default QuickActions;


