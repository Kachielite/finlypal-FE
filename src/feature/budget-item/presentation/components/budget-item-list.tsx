import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { router } from 'expo-router';
import barColor from '@/src/core/utils/barColor';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';

const BudgetListItem = ({budgetItem}:{budgetItem: BudgetItem}) => {

  const currency = useAuthState((state) => state.user?.currency.symbol);
  const totalBudget = budgetItem?.allocatedAmount;
  const actualSpend = budgetItem?.actualSpend;
  const percentage = (actualSpend / totalBudget) * 100;

  const onPressHandler = () => {
    router.push(`/budget-items/${budgetItem.id.toString()}`);
  };

  return (
    <TouchableOpacity onPress={onPressHandler} className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] pb-8">
      <Text className="text-4xl">{budgetItem.icon}</Text>
      <View className="w-[85%] flex flex-col justify-center items-start gap-y-[14px]">
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-white font-urbanist-bold text-[14px]">{budgetItem.name}</Text>
          <Text className="text-white font-urbanist-normal text-[12px]">{currency}{actualSpend} of {currency}{totalBudget}</Text>
        </View>
        <View className="w-full rounded-2xl h-[8px] bg-[#102632]">
          <View style={{width: `${percentage <= 100 ? percentage : 100}%`, backgroundColor: barColor(percentage)}} className="rounded-2xl h-full"/>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default BudgetListItem;
