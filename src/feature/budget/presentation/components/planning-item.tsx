import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Budget, BudgetStatus } from '@/src/feature/budget/domain/entity/budget';
import { router } from 'expo-router';
import barColor from '@/src/core/utils/barColor';

const PlanningItem = ({budget}:{budget: Budget}) => {


  const totalBudget = budget.totalBudget;
  const actualSpend = budget.actualSpend as number;
  const percentage = (actualSpend / totalBudget) * 100;

  const handlePress = () => {
    router.push({
      pathname: "/budget/[budget_id]" as const,
      params: { budget_id: budget.id }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] py-4 rounded-lg bg-[#1E2A32] px-[12px] shadow-lg">
      <Text className="text-4xl">{budget.icon}</Text>
      <View className="w-[85%] flex flex-col justify-center items-start gap-y-[10px]">
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-white font-urbanist-bold text-[14px]">{budget.name}</Text>
          <Text className="text-white font-urbanist-normal text-[10px]">{BudgetStatus[budget.status as unknown as keyof typeof BudgetStatus]}</Text>
        </View>
        <View className="w-full rounded-2xl h-[8px] bg-[#102632]">
          <View style={{width: `${percentage <= 100 ? percentage : 100}%`, backgroundColor: barColor(percentage)}} className="rounded-2xl h-full"/>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default PlanningItem;
