import { View } from 'react-native';
import React from 'react';
import { Budget } from '@/src/feature/budget/domain/entity/budget';

const PlanningItem = ({budget}:{budget: Budget}) => {

  const totalBudget = budget.totalBudget;
  const actualSpend = budget.actualSpend as number;
  const percentage = (actualSpend / totalBudget) * 100;



  return (
    <View className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] py-4 rounded-lg bg-[#1E2A32] px-[12px] shadow-lg">
      <p>{budget.icon}</p>
      <View className="w-[70%] flex flex-col justify-center items-start gap-y-[10px]">
        <View className="w-full flex flex-row justify-between items-center">
          <p className="text-white font-urbanist-normal text-[14px]">{budget.name}</p>
          <p className="text-white font-urbanist-normal text-[14px]">${budget.totalBudget}</p>
        </View>
        <View className="w-full rounded-2xl h-[8px] bg-[#35383F]">
          <View className={`w-[${percentage}%] rounded-2xl h-[8px] bg-[#17CE92]`}/>
        </View>
      </View>
    </View>
  );
};
export default PlanningItem;
