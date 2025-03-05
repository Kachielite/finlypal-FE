import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ArrowDown, ArrowUp } from 'lucide-react-native';


const QuickActions = () => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <Text className="text-white font-urbanist-bold text-[20px]">Quick Actions</Text>
      <View className="flex-row justify-between mt-2 w-full gap-x-[12px]">
        {/* Add Income Button */}
        <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#2E7D32] rounded-lg py-4 mr-2">
          <ArrowUp size={20} strokeWidth={4} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Add Income</Text>
        </TouchableOpacity>

        {/* Add Expense Button */}
        <TouchableOpacity className="flex-1 flex-row items-center justify-center bg-[#C62828] rounded-lg py-4 ml-2">
          <ArrowDown size={20} strokeWidth={4} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Add Expense</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default QuickActions;


