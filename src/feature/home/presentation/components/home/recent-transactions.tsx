import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';


const RecentTransactions = () => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-white font-urbanist-bold text-[20px]">Recent Actions</Text>
        <TouchableOpacity>
          <Text className="text-white text-[16px]">See All</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};
export default RecentTransactions;


