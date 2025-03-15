import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { ArrowLeft, SlidersHorizontal } from 'lucide-react-native';
import EmptyState from '@/src/shared/presentation/components/empty-state';
import PlanningItem from '@/src/feature/budget/presentation/components/planning-item';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import { router } from 'expo-router';

const BudgetScreen = () => {
  const budgetList = useBudgetState((state) => state.budgetList);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
      <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[42px]">
        <View className="flex flex-row justify-between items-center w-full">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="white" size={28} />
          </TouchableOpacity>
          <Text className="text-white font-urbanist-bold text-[24px]">All Budgets</Text>
          <TouchableOpacity onPress={() => console.log('settings')}>
            <SlidersHorizontal color="white" size={28} />
          </TouchableOpacity>
        </View>
        {budgetList.length === 0 &&
          <View className="flex flex-col justify-center items-center  px-[15px] w-full h-[90%] bg-alternative gap-y-[24px] rounded-[12px]">
            <EmptyState title="No Budget Found" />
          </View>
        }
        {budgetList.map((item) => <PlanningItem key={item.id} budget={item}/>)}
      </View>
    </SafeAreaView>
  );
};
export default BudgetScreen;
