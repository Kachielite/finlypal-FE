import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import Loader from '@/src/shared/presentation/components/loader';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import BalanceCard from '@/src/feature/budget-item/presentation/components/balance-card';
import useBudgetItem from '@/src/feature/budget-item/presentation/state/useBudgetItem';
import ExpensesList from '@/src/feature/expenses/presentation/components/expenses-list';
import AppModal from '@/src/shared/presentation/components/app-modal';
import { Modalize } from 'react-native-modalize';
import EmptyTransactionList from '@/src/feature/home/presentation/components/empty-transaction-list';
import AddBudgetItemModal from '@/src/feature/budget-item/presentation/components/add-budget-item-modal';
import { budgetItemBloc } from '@/src/feature/budget-item/presentation/state/budgetItemBloc';
import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { Budget } from '@/src/feature/budget/domain/entity/budget';


const BudgetItemScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const createModalRef = useRef<Modalize>(null);
  const deleteModalRef = useRef<Modalize>(null);
  const optionModalRef = useRef<Modalize>(null);

  const {budget_item_id} = useLocalSearchParams<{ budget_item_id: string}>()
  const {} = useBudgetItem({budget_item_id});

  const {setModalType} = useBudgetItemState((state) => state);
  const isLoadingSelectedBudgetItem = useBudgetItemState((state) => state.isLoadingSelectedBudgetItem);
  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);
  const selectedBudget = useBudgetState((state) => state.selectedBudget);
  const groupedExpenses = null;

  const openEditBudgetItemModal = () => {
    setModalType("edit");
    modalizeRef.current?.open();
  };

  const openDeleteBudgetItemModal = () => {
    deleteModalRef.current?.open();
  };

  const deleteBudgetItemHandler = async () => {
    await budgetItemBloc.handleBudgetItemEvent(BUDGET_ITEM_EVENTS.DELETE_BUDGET_ITEM, {budgetItemId: selectedBudgetItem?.id});
    const selectedBudgetBudgetItems = selectedBudget?.budgetItems as BudgetItem[];
    const updatedBudgetItems = [...selectedBudgetBudgetItems?.filter((budgetItem) => budgetItem.id !== selectedBudgetItem?.id)]
    useBudgetState.getState().setSelectedBudget({...selectedBudget, budgetItems: updatedBudgetItems} as Budget);
    deleteModalRef.current?.close();
    router.back();
  };

  return (
      <>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
          {isLoadingSelectedBudgetItem || !selectedBudgetItem ? (
            <View className="flex flex-col justify-center items-center h-full w-full">
              <Loader />
            </View>
          ) : (
            <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[42px]">
              {/* Header Section */}
              <View className="flex flex-row justify-between items-center w-full">
                <TouchableOpacity onPress={() => router.back()}>
                  <ArrowLeft  color="white" size={28} />
                </TouchableOpacity>
                <Text className="text-white font-urbanist-bold text-[24px]">Budget Item Details</Text>
                <View/>
              </View>
              <BalanceCard
                budgetItem={selectedBudgetItem}
                openEditBudgetItemModal={openEditBudgetItemModal}
                openDeleteBudgetItemModal={openDeleteBudgetItemModal}
              />
              {/* Expenses List with FlatList */}
              <FlatList
                data={groupedExpenses}
                keyExtractor={(item) => item.date} // Ensure unique keys
                renderItem={({ item }) =>
                  <ExpensesList
                    data={item}
                    createModalRef={createModalRef}
                    deleteModalRef={deleteModalRef}
                    optionModalRef={optionModalRef}
                  />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 40 }} // Preserve bottom spacing
                onEndReachedThreshold={0.5}
                maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
                ListEmptyComponent={
                  <View className="flex flex-col justify-center items-center w-[88vw] h-[30vh] bg-alternative rounded-[12px]">
                    <EmptyTransactionList title="No Expenses Found" message="Get started by adding an expense" />
                  </View>
                }
              />
            </View>
          )}
        </SafeAreaView>
        <AddBudgetItemModal modalizeRef={modalizeRef}/>
        <AppModal
          modalizeRef={deleteModalRef}
          title="Delete Expense"
          description="Deleting this budget item will also delete all expenses associated with it. Are you sure you want to proceed?"
          proceedAction={deleteBudgetItemHandler}
          proceedButtonLabel="Delete"
          isLoading={false}
        />
      </>
  );
};
export default BudgetItemScreen;
