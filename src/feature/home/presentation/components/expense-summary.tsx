import { Text, View } from 'react-native';
import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react-native';
import formatNumber from '@/src/core/utils/formatCurrency';

const ExpenseSummary = ({income, expense, currency}: {income: number, expense: number, currency?: string}) => {
  return (
    <View className="w-full flex flex-row justify-between items-center">
      <View className="flex flex-row justify-start items-start gap-x-[12px]">
        <View className="rounded-md p-[12px] bg-[#1E2A32]">
          <TrendingUp size={32} color="#17CE92" strokeWidth={3}/>
        </View>
        <View className="gap-y-1.5">
          <Text className="font-urbanist-bold text-[14px] text-[#A0AEC0]">Income</Text>
          <Text className="font-urbanist-bold text-[16px] text-white">{currency}{formatNumber(income)}</Text>
        </View>
      </View>
      <View className="flex flex-row justify-start items-start gap-x-[12px]">
        <View className="rounded-md p-[12px] bg-[#1E2A32]">
          <TrendingDown size={32} color="#CE174B" strokeWidth={3}/>
        </View>
        <View className="gap-y-1.5">
          <Text className="font-urbanist-bold text-[14px] text-[#A0AEC0]">Expense</Text>
          <Text className="font-urbanist-bold text-[16px] text-white">{currency}{formatNumber(expense)}</Text>
        </View>
      </View>
    </View>
  );
};
export default ExpenseSummary;
