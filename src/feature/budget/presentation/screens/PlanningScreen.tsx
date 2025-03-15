import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';
import EasyAccess from '@/src/feature/budget/presentation/components/easy-access';

const PlanningScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
      <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[42px]">
        {/* Header Section */}
        <View className="flex flex-row justify-center items-center w-full">
          <Text className="text-white font-urbanist-bold text-[24px]">Planning</Text>
        </View>
        <EasyAccess/>
      </View>
    </SafeAreaView>
  );
};
export default PlanningScreen;
