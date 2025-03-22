import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import barColor from '@/src/core/utils/barColor';
import { Savings, SavingsStatus } from '@/src/feature/savings/domain/entity/savings';

const SavingsItem = ({savings}:{savings: Savings}) => {

  const targetAmount = savings.targetAmount
  const savedAmount = savings.savedAmount as number;
  const percentage = (savedAmount / targetAmount) * 100;

  const handlePress = () => {
    router.push({
      pathname: `/savings/[savings_id]` as const,
      params: { savings_id: savings.id }
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] py-4 rounded-lg bg-[#1E2A32] px-[12px] shadow-lg">
      <Text className="text-4xl">{savings.icon}</Text>
      <View className="w-[85%] flex flex-col justify-center items-start gap-y-[10px]">
        <View className="w-full flex flex-row justify-between items-center">
          <Text className="text-white font-urbanist-bold text-[14px]">{savings.goalName}</Text>
          <Text className="text-white font-urbanist-normal text-[10px]">{SavingsStatus[savings.status as unknown as keyof typeof SavingsStatus]}</Text>
        </View>
        <View className="w-full rounded-2xl h-[8px] bg-[#102632]">
          <View style={{width: `${percentage <= 100 ? percentage : 100}%`, backgroundColor: barColor(percentage, 'savings')}} className="rounded-2xl h-full"/>
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default SavingsItem;
