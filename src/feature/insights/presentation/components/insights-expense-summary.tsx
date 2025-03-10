import { Text, View } from 'react-native';
import React from 'react';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';
import { TrendingDown, TrendingUp } from 'lucide-react-native';
import formatNumber from '@/src/core/utils/formatCurrency';

const InsightsExpenseSummary = () => {

  const totalExpense = useInsightsState((state) => state.totalExpense);
  const totalIncome = useInsightsState((state) => state.totalIncome);

  return (
    <View className="flex flex-col justify-center items-start py-[20px] px-[15px] w-full bg-alternative gap-y-[24px] rounded-[12px]">
      <Text className="text-white font-urbanist-bold text-[18px]">Expense and Income Summary</Text>
      <View className="w-full flex flex-row justify-between items-center">
        <View className="flex flex-row justify-start items-start gap-x-[12px]">
          <View className="rounded-md p-[10px] bg-secondary">
            <TrendingUp size={24} color="white" strokeWidth={3}/>
          </View>
          <View className="gap-y-1.5">
            <Text className="font-urbanist-bold text-[14px] text-[#A0AEC0]">Income</Text>
            <Text className="font-urbanist-bold text-[18px] text-white">${formatNumber(totalIncome)}</Text>
          </View>
        </View>
        <View className="flex flex-row justify-start items-start gap-x-[12px]">
          <View className="rounded-md p-[10px] bg-[#CE174B]">
            <TrendingDown size={24} color="white" strokeWidth={3}/>
          </View>
          <View className="gap-y-1.5">
            <Text className="font-urbanist-bold text-[14px] text-[#A0AEC0]">Expense</Text>
            <Text className="font-urbanist-bold text-[18px] text-white">${formatNumber(totalExpense)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default InsightsExpenseSummary;
