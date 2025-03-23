import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowDown, ArrowUp, ChartPieIcon, PiggyBankIcon } from 'lucide-react-native';
import { router } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import { useSavingState } from '@/src/feature/savings/presentation/state/savingsState';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';


const QuickActions = ({savingsModal, budgetModal}: {savingsModal: React.RefObject<Modalize>, budgetModal: React.RefObject<Modalize>}) => {
  const openSavingsModal = () => {
    useSavingState.getState().setModalType('add');
    savingsModal.current?.open();
  }

  const openBudgetModal = () => {
    useBudgetState.getState().setModalType('add');
    budgetModal.current?.open();
  }

  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <Text className="text-white font-urbanist-bold text-[20px]">Quick Actions</Text>
      <View className="flex flex-row justify-between w-full">
        <TouchableOpacity onPress={() => router.push({pathname: '/expense/add-expense', params: {typeOfExpense: 'income'}})} className="flex items-center gap-y-2.5">
          <View className="p-5 bg-green-500 rounded-lg size-[60px] flex justify-center items-center">
            <ArrowUp size={34} strokeWidth={3} color="white" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm font-urbanist-bold">Income</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push({pathname: '/expense/add-expense', params: {typeOfExpense: 'expense'}})} className="flex items-center gap-y-2.5">
          <View className="p-5 bg-red-500 rounded-lg size-[60px] flex justify-center items-center">
            <ArrowDown size={34} strokeWidth={3} color="white" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm font-urbanist-bold">Expense</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openSavingsModal} className="flex items-center gap-y-2.5">
          <View className="p-5 bg-[#0D9488] rounded-lg size-[60px] flex justify-center items-center">
            <PiggyBankIcon size={34} strokeWidth={2} color="white" />
          </View>
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white text-sm font-urbanist-bold">Savings</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openBudgetModal} className="flex items-center  gap-y-2.5">
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


