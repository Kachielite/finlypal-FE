import { Text, View } from 'react-native';
import React from 'react';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import moment from 'moment';
import barColor from '@/src/core/utils/barColor';

const BalanceCard = ({selectedBudget}: {selectedBudget: Budget}) => {
  const totalBudget = selectedBudget?.totalBudget;
  const actualSpend = selectedBudget?.actualSpend as number;
  const percentage = (actualSpend / totalBudget) * 100;

  return (
    <View className="relative flex-1 w-full flex-col justify-start items-center px-6 pt-4 pb-10 gap-y-10 shadow-xl">
      <View className="absolute -top-[90px] w-[90vw] h-[180px] bg-alternative rounded-[12px] flex flex-col justify-between items-start z-20 px-6 py-4">
        <Text className="text-white font-urbanist-bold text-3xl">
          {selectedBudget?.name}
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
            <View style={{width: `${percentage <= 100 ? percentage : 100}%`, backgroundColor: barColor(percentage)}} className="rounded-2xl h-full"/>
          </View>
          <View className="flex flex-row justify-between items-center w-full">
            <View className="flex flex-row justify-start items-center gap-x-[5px]">
              <Text className="text-white font-urbanist-bold text-[16px]">
                ${actualSpend}
              </Text>
              <Text className="text-white font-urbanist-medium text-[12px]">
                of ${totalBudget}
              </Text>
            </View>
            <Text className="text-white font-urbanist-medium text-[12px]">
              {moment(selectedBudget?.endDate).diff(moment(), 'days')} Days left
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default BalanceCard;
