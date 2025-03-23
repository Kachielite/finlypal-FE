import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ChartPieIcon, PiggyBank } from 'lucide-react-native';

const EasyAccess = ({addBudgetModal, openSavingsModal}: {addBudgetModal: () => void, openSavingsModal: (modalType: 'add' | 'edit') => void}) => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <Text className="text-white font-urbanist-bold text-[20px]">Instant Actions</Text>
      <View className="flex-row justify-between mt-2 w-full gap-x-[12px]">
        {/* Add Savings Button */}
        <TouchableOpacity onPress={() => openSavingsModal('add')} className="flex-1 flex-row items-center justify-center bg-[#22C55E] rounded-lg py-4 mr-2">
          <PiggyBank size={24} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Add Savings</Text>
        </TouchableOpacity>

        {/* Add Budget Button */}
        <TouchableOpacity onPress={addBudgetModal} className="flex-1 flex-row items-center justify-center bg-[#007BFF]  rounded-lg py-4 ml-2 ">
          <ChartPieIcon size={24} color="white" />
          <Text className="text-white font-bold text-lg ml-2">Add Budget</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default EasyAccess;
