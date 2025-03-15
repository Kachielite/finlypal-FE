import { Text, TouchableOpacity, View } from 'react-native';
import React, { ReactNode } from 'react';

const PlanningList = ({itemList, title, onPress}:{itemList: ReactNode[], title: string, onPress: () => void}) => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-white font-urbanist-bold text-[20px]">{title}</Text>
        <TouchableOpacity onPress={onPress}>
          <Text className="text-white text-[14px]">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="rounded-lg bg-[#1E2A32] p-[12px] max-h-[40vh] w-full">
        {itemList}
      </View>
    </View>
  );
};
export default PlanningList;
