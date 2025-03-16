import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, EllipsisVertical, Info } from 'lucide-react-native';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import Loader from '@/src/shared/presentation/components/loader';
import useBudget from '@/src/feature/budget/presentation/state/useBudget';
import images from '@/src/core/constants/images';
import BalanceCard from '@/src/feature/budget/presentation/components/balance-card';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import BudgetItemsList from '@/src/feature/budget-item/presentation/components/budget-items';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';

const BudgetScreen = () => {
  const { budget_id } = useLocalSearchParams<{ budget_id: string }>();
  const {} = useBudget({budgetId: Number(budget_id)});
  const isLoadingSelectedBudget = useBudgetState((state) => state.isLoadingSelectedBudget);
  const selectedBudget = useBudgetState((state) => state.selectedBudget);

  return (
    <View className="relative flex-1 bg-[#102632] ">
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <ImageBackground
        source={images.budgetBackground}
        className="relative w-full h-[30vh] rounded-b-[40px] overflow-hidden"
        resizeMode="cover"
      >
        <View className="flex-1 w-full flex-col justify-start items-start px-6 pt-4 pb-10 gap-y-10 mt-[60px] z-50 ">
          <View className="flex-row justify-between items-center w-full">
            <TouchableOpacity onPress={() => router.back()}>
              <ArrowLeft  color="white" size={28} />
            </TouchableOpacity>
            <Text style={{textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: {width: 0, height: 2}, textShadowRadius: 2}} className="text-white font-urbanist-bold text-2xl">
              Budget Details
            </Text>
            <TouchableOpacity onPress={() => console.log('settings')}>
              <EllipsisVertical color="white" size={28} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      {isLoadingSelectedBudget ? (
        <View className="flex-1 flex-col justify-center items-center w-full">
          <Loader />
        </View>
      ) : (
        <>
          <BalanceCard selectedBudget={selectedBudget as Budget}/>
          <View
            className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[25px] absolute top-[27rem]">
            <View className="flex flex-row justify-start items-center gap-x-[5px] w-[88w]">
              <Info color="white" size={18} strokeWidth={3}/>
              <Text className="text-white font-urbanist-normal text-[14px]">{selectedBudget?.statusTooltip}</Text>
            </View>
            <BudgetItemsList budgetItems={(selectedBudget?.budgetItems) as BudgetItem[]}/>
          </View>
        </>
      )}
    </View>
  );
};
export default BudgetScreen;
