import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, EllipsisVertical, Info } from 'lucide-react-native';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import Loader from '@/src/shared/presentation/components/loader';
import useBudget from '@/src/feature/budget/presentation/state/useBudget';
import images from '@/src/core/constants/images';
import BalanceCard from '@/src/feature/budget/presentation/components/balance-card';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import BudgetItemsList from '@/src/feature/budget-item/presentation/components/budget-items';
import { Modalize } from 'react-native-modalize';
import BudgetDetailsOption from '@/src/feature/budget/presentation/components/budget-details-option';
import AppModal from '@/src/shared/presentation/components/app-modal';
import AddBudgetModal from '@/src/feature/budget/presentation/components/add-budget-modal';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';

const BudgetScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const createModalRef = useRef<Modalize>(null);
  const deleteModalRef = useRef<Modalize>(null);
  const optionModalRef = useRef<Modalize>(null);

  const { budget_id } = useLocalSearchParams<{ budget_id: string }>();
  const {} = useBudget({budgetId: Number(budget_id)});
  const isLoadingSelectedBudget = useBudgetState((state) => state.isLoadingSelectedBudget);
  const selectedBudget = useBudgetState((state) => state.selectedBudget);
  const isModifyingBudget = useBudgetState((state) => state.isModifyingBudget);
  const {setModalType} = useBudgetState((state) => state)

  const onOpenOptions = () => {
    optionModalRef.current?.open();
  };

  const openCreateModal = () => {
    setModalType("edit");
    createModalRef.current?.open();
    optionModalRef.current?.close();
  };

  const openDeleteModal = () => {
    deleteModalRef.current?.open();
    optionModalRef.current?.close();
  };

  const deleteBudgetHandler = async() => {
    try {
      await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.DELETE_BUDGET, {
        budgetId: selectedBudget?.id
      });
      deleteModalRef.current?.close();
      router.back();
    } catch (e) {
      console.log("Error deleting budget: ", e)
    }
  }
  

  return (
    <>
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
              <TouchableOpacity onPress={onOpenOptions}>
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
      <BudgetDetailsOption
        modalizeRef={optionModalRef}
        openCreateModal={openCreateModal}
        openDeleteModal={openDeleteModal}
      />
      <AddBudgetModal
        modalizeRef={createModalRef}
      />
      <AppModal
        modalizeRef={deleteModalRef}
        title="Delete Budget"
        description="Are you sure you want to delete this expense? Deleting this budget will permanently remove all associated buget items and expenses."
        proceedAction={deleteBudgetHandler}
        proceedButtonLabel="Delete"
        isLoading={isModifyingBudget}
      />
    </>
  );
};
export default BudgetScreen;
