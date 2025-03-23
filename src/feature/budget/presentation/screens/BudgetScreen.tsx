import { ImageBackground, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, EllipsisVertical } from 'lucide-react-native';
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
import AddBudgetItemModal from '@/src/feature/budget-item/presentation/components/add-budget-item-modal';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';

const BudgetScreen = () => {
  const createModalRef = useRef<Modalize>(null);
  const deleteModalRef = useRef<Modalize>(null);
  const optionModalRef = useRef<Modalize>(null);
  const addBudgetItemModalRef = useRef<Modalize>(null);
  const markAsCompletedModalRef = useRef<Modalize>(null);

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

  const openAddBudgetItemModal = () => {
    useBudgetItemState.getState().setModalType("add");
    addBudgetItemModalRef.current?.open();
    optionModalRef.current?.close();
  };

  const openMarkAsCompletedModal = () => {
    markAsCompletedModalRef.current?.open();
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

  const markBudgetAsCompletedHandler = async() => {
    try {
      await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.MARK_BUDGET_AS_COMPLETED, {
        budgetId: selectedBudget?.id
      });
      await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGET_BY_ID, {
        budgetId: selectedBudget?.id
      });
      await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});
      markAsCompletedModalRef.current?.close();
    } catch (e) {
      console.log("Error marking budget as completed: ", e)
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
                <Text className="text-white font-urbanist-normal text-[14px]">{selectedBudget?.statusTooltip}</Text>
              </View>
              <BudgetItemsList budgetItems={(selectedBudget?.budgetItems) as BudgetItem[]}/>
            </View>
          </>
        )}
      </View>
      <BudgetDetailsOption
        budgetStatus={selectedBudget?.status}
        modalizeRef={optionModalRef}
        openCreateModal={openCreateModal}
        openDeleteModal={openDeleteModal}
        openAddBudgetItemModal={openAddBudgetItemModal}
        openMarkAsCompletedModal={openMarkAsCompletedModal}
      />
      <AddBudgetModal
        modalizeRef={createModalRef}
      />
      <AddBudgetItemModal modalizeRef={addBudgetItemModalRef}/>
      <AppModal
        modalizeRef={deleteModalRef}
        title="Delete Budget"
        description="Are you certain you want to delete this budget? This action will permanently remove all associated items and expenses."
        proceedAction={deleteBudgetHandler}
        proceedButtonLabel="Delete"
        isLoading={isModifyingBudget}
      />
      <AppModal
        modalizeRef={markAsCompletedModalRef}
        title="Mark Budget as Completed"
        description="Are you certain you want to mark this budget as completed? This action will prevent any further modification to this budget."
        proceedAction={markBudgetAsCompletedHandler}
        proceedButtonLabel="Proceed"
        isLoading={isModifyingBudget}
      />
    </>
  );
};
export default BudgetScreen;
