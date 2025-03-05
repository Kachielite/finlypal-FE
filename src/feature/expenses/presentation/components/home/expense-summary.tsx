import { Text, View } from 'react-native';
import React from 'react';
import { ArrowDown, ArrowUp } from 'lucide-react-native';

const ExpenseSummary = () => {
  return (
    <View className="w-full flex flex-row justify-between items-center">
      <View className="flex flex-row justify-start items-start gap-x-[12px]">
        <View className="rounded-md p-[12px] bg-[#1E2A32]">
          <ArrowUp size={32} color="#00C853" strokeWidth={3}/>
        </View>
        <View className="gap-y-1.5">
          <Text className="font-urbanist-bold text-[14px] text-[#A0AEC0]">Income</Text>
          <Text className="font-urbanist-bold text-[24px] text-white">$460.00</Text>
        </View>
      </View>
      <View className="flex flex-row justify-start items-start gap-x-[12px]">
        <View className="rounded-md p-[12px] bg-[#1E2A32]">
          <ArrowDown size={32} color="#FF5252" strokeWidth={3}/>
        </View>
        <View className="gap-y-1.5">
          <Text className="font-urbanist-bold text-[14px] text-[#A0AEC0]">Expense</Text>
          <Text className="font-urbanist-bold text-[24px] text-white">$231.00</Text>
        </View>
      </View>

    </View>
  );
};
export default ExpenseSummary;
