import { Text, View } from 'react-native';
import barColor from '@/src/core/utils/barColor';
import moment from 'moment/moment';
import React from 'react';
import { Savings } from '@/src/feature/savings/domain/entity/savings';

const BalanceCard = ({selectedSaving}: {selectedSaving: Savings}) => {
  const targetAmount = selectedSaving?.targetAmount;
  const savedAmount = selectedSaving?.savedAmount as number;
  const percentage = (savedAmount / targetAmount) * 100;

  return (
    <View className="relative flex-1 w-full flex-col justify-start items-center px-6 pt-4 pb-10 gap-y-10 shadow-xl">
      <View className="absolute -top-[90px] w-[90vw] h-[180px] bg-alternative rounded-[12px] flex flex-col justify-between items-start z-20 px-6 py-4">
        <Text className="text-white font-urbanist-bold text-3xl">
          {selectedSaving?.goalName}
        </Text>
        <View className="flex flex-col justify-start items-start gap-y-[10px] w-full">
          <View className="flex flex-row justify-between items-center w-full">
            <Text className="text-white font-urbanist-medium text-[14px]">
              Balance
            </Text>
            <Text className="text-white font-urbanist-medium text-[14px]">
              {percentage.toFixed(2)}%
            </Text>
          </View>
          <View className="w-full rounded-2xl h-[8px] bg-[#102632]">
            <View style={{width: `${percentage <= 100 ? percentage : 100}%`, backgroundColor: barColor(percentage, 'savings')}} className="rounded-2xl h-full"/>
          </View>
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex flex-row justify-start items-center gap-x-[5px]">
              <Text className="text-white font-urbanist-bold text-[16px]">
                ${savedAmount}
              </Text>
              <Text className="text-white font-urbanist-medium text-[12px]">
                of ${targetAmount}
              </Text>
            </View>
            <Text className="text-white font-urbanist-medium text-[12px]">
              {moment(selectedSaving?.endDate).diff(moment(), 'days')} Days left
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default BalanceCard;