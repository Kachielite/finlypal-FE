import { SafeAreaView, ScrollView, Text, View } from 'react-native';
import React, { useRef } from 'react';
import EasyAccess from '@/src/feature/budget/presentation/components/easy-access';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import BudgetList from '@/src/feature/budget/presentation/components/budget-list';
import Loader from '@/src/shared/presentation/components/loader';
import useBudget from '@/src/feature/budget/presentation/state/useBudget';
import { router } from 'expo-router';
import { Modalize } from 'react-native-modalize';
import AddBudgetModal from '@/src/feature/budget/presentation/components/add-budget-modal';
import SavingsList from '@/src/feature/savings/presentation/components/savings-list';
import useSavings from '@/src/feature/savings/presentation/state/useSavings';
import AddSavingsModal from '@/src/feature/savings/presentation/components/add-savings-modal';
import { useSavingState } from '@/src/feature/savings/presentation/state/savingsState';

const PlanningScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const savingsModal = useRef<Modalize>(null);

  const {resetAddBudgetForm} = useBudget({});
  const {savingsList} = useSavings({});
  const budgetList = useBudgetState((state) => state.budgetList);
  const isLoadingBudgets = useBudgetState((state) => state.isLoadingBudgets);
  const {setModalType, setSelectedBudget} = useBudgetState((state) => state);


  const onOpen = () => {
    setModalType('add');
    setSelectedBudget(null)
    resetAddBudgetForm()
    modalizeRef.current?.open();
  };

  const openSavingsModal = () => {
    useSavingState.getState().setModalType('add');
    savingsModal.current?.open();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
        { isLoadingBudgets ?
          <View
            className="flex flex-col justify-center items-center h-full w-full"
          >
            <Loader />
          </View> :
          <View
            className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[42px]"
          >
            <View className="flex flex-row justify-center items-center w-full">
              <Text className="text-white font-urbanist-bold text-[24px]">Planning</Text>
            </View>
            <EasyAccess
              addBudgetModal={onOpen}
              openSavingsModal={openSavingsModal}
            />
            <ScrollView
              contentContainerClassName="pb-[100px] gap-y-[42px]"
              showsVerticalScrollIndicator={false}
            >
              <BudgetList
                type="Budget Plans"
                onPressSeeAll={() => router.push('/budget')}
                ListItems={budgetList.slice(0, 3)}
              />
              <SavingsList
                type="Saving Goals"
                onPressSeeAll={() => router.push('/savings')}
                ListItems={savingsList.slice(0, 3)}
              />
            </ScrollView>
          </View>}
      </SafeAreaView>
      <AddBudgetModal
        modalizeRef={modalizeRef}
        includeTabPadding
      />
      <AddSavingsModal
        includeTabPadding
        savingsModal={savingsModal}
      />
    </>
  );
};
export default PlanningScreen;
