import { SafeAreaView, Text, View } from 'react-native';
import React, { useRef } from 'react';
import EasyAccess from '@/src/feature/budget/presentation/components/easy-access';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import BudgetList from '@/src/feature/budget/presentation/components/budget-list';
import Loader from '@/src/shared/presentation/components/loader';
import useBudget from '@/src/feature/budget/presentation/state/useBudget';
import { router } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import AddBudgetModal from '@/src/feature/budget/presentation/components/add-budget-modal';

const PlanningScreen = () => {
  const modalizeRef = useRef<Modalize>(null);

  const {} = useBudget({});
  const budgetList = useBudgetState((state) => state.budgetList);
  const isLoadingBudgets = useBudgetState((state) => state.isLoadingBudgets);


  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
        { isLoadingBudgets ?
          <View className="flex flex-col justify-center items-center h-full w-full">
            <Loader />
          </View> :
          <View
            className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[42px]">
            {/* Header Section */}
            <View className="flex flex-row justify-center items-center w-full">
              <Text className="text-white font-urbanist-bold text-[24px]">Planning</Text>
            </View>
            <EasyAccess addBudget={onOpen} />
            <BudgetList type="Budget" onPressSeeAll={() => router.push('/budget')} ListItems={budgetList.slice(0, 3)} />
          </View>}
      </SafeAreaView>
      <AddBudgetModal modalizeRef={modalizeRef} />
    </>
  );
};
export default PlanningScreen;
