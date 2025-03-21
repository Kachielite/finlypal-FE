import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useRef } from 'react';
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
import AddExpenseToBudgetItemModal
  from '@/src/feature/budget-item/presentation/components/add-expense-to-budget-item-modal';
import { groupExpenseByDate } from '@/src/core/utils/groupExpenseByDate';
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';


const BudgetItemScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const createModalRef = useRef<Modalize>(null);
  const deleteModalRef = useRef<Modalize>(null);
  const optionModalRef = useRef<Modalize>(null);
  const expenseModalRef = useRef<Modalize>(null);
  const deleteExpenseModalRef = useRef<Modalize>(null);

  const {budget_item_id} = useLocalSearchParams<{ budget_item_id: string}>()
  const {} = useBudgetItem({budget_item_id});

  const {setModalType} = useBudgetItemState((state) => state);
  const {setModalType: setExpenseModalType, setSelectedExpense} = useExpenseState((state) => state);
  const isLoadingSelectedBudgetItem = useBudgetItemState((state) => state.isLoadingSelectedBudgetItem);
  const isModifyingBudgetItem = useBudgetItemState((state) => state.isModifyingBudgetItem);
  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);
  const selectedBudget = useBudgetState((state) => state.selectedBudget);
  const selectedExpense = useExpenseState((state) => state.selectedExpense);
  const isModifyingExpense = useExpenseState((state) => state.isModifyingExpense);
  const expenseList = selectedBudgetItem?.expenses || [];
  const groupedExpenses = useMemo(() => groupExpenseByDate(expenseList), [expenseList]);


  const openEditBudgetItemModal = () => {
    setModalType("edit");
    modalizeRef.current?.open();
  };

  const openExpenseModal = () => {
    setExpenseModalType("add");
    expenseModalRef.current?.open();
  }

  const openDeleteBudgetItemModal = () => {
    deleteModalRef.current?.open();
  };

  const deleteBudgetItemHandler = async () => {
    await budgetItemBloc.handleBudgetItemEvent(BUDGET_ITEM_EVENTS.DELETE_BUDGET_ITEM, {budgetItemId: selectedBudgetItem?.id});
    await budgetBloc.handleBudgetEvent(
      BUDGET_EVENTS.GET_BUDGET_BY_ID, {budgetId: selectedBudget?.id}
    );
    await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});
    deleteModalRef.current?.close();
    router.back();
  };

  const deleteExpenseHandler = async () => {
    await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.DELETE_EXPENSE, {id: selectedExpense?.id});
    useExpenseState.getState().setExpenseList([...expenseList.filter((item) => item.id !== selectedExpense?.id)])
    await budgetItemBloc.handleBudgetItemEvent(
      BUDGET_ITEM_EVENTS.GET_BUDGET_ITEM_BY_ID, {budgetItemId: selectedBudgetItem?.id}
    );

    await budgetBloc.handleBudgetEvent(
      BUDGET_EVENTS.GET_BUDGET_BY_ID, {budgetId: selectedBudget?.id}
    );

    await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});

    deleteExpenseModalRef.current?.close();
  }

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
                <Text className="text-white font-urbanist-bold text-[24px]">Budget Category Details</Text>
                <View/>
              </View>
              <BalanceCard
                budgetItem={selectedBudgetItem}
                openEditBudgetItemModal={openEditBudgetItemModal}
                openDeleteBudgetItemModal={openDeleteBudgetItemModal}
                openExpenseModal={openExpenseModal}
              />
              {/* Expenses List with FlatList */}
              <FlatList
                data={groupedExpenses}
                keyExtractor={(item) => item.date} // Ensure unique keys
                renderItem={({ item }) =>
                  <ExpensesList
                    data={item}
                    createModalRef={expenseModalRef}
                    deleteModalRef={deleteExpenseModalRef}
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
        <AddExpenseToBudgetItemModal modalizeRef={expenseModalRef} />
        <AppModal
          modalizeRef={deleteModalRef}
          title="Delete Budget Category"
          description="Deleting this budget category will also delete all expenses associated with it. Are you sure you want to proceed?"
          proceedAction={deleteBudgetItemHandler}
          proceedButtonLabel="Delete"
          isLoading={isModifyingBudgetItem}
        />
        <AppModal
          modalizeRef={deleteExpenseModalRef}
          title="Delete Expense"
          description="Are you sure you want to delete this expense?"
          proceedAction={deleteExpenseHandler}
          proceedButtonLabel="Delete"
          isLoading={isModifyingExpense}
        />
      </>
  );
};
export default BudgetItemScreen;
