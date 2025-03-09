import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { CirclePlus, SlidersHorizontal } from 'lucide-react-native';
import { groupExpenseByDate } from '@/src/core/utils/groupExpenseByDate';
import ExpensesList from '@/src/feature/expenses/presentation/components/expenses-list';
import { Modalize } from 'react-native-modalize';
import FilterExpenseModal from '@/src/feature/expenses/presentation/components/filter-expense-modal';
import useExpense from '@/src/feature/expenses/presentation/state/useExpense';
import Loader from '@/src/shared/presentation/components/loader';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import AddExpenseModal from '@/src/feature/expenses/presentation/components/add-expense-modal';
import AppModal from '@/src/shared/presentation/components/app-modal';
import ExpenseOptionModal from '@/src/feature/expenses/presentation/components/expense-option-modal';
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';


const ExpensesScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const createModalRef = useRef<Modalize>(null);
  const deleteModalRef = useRef<Modalize>(null);
  const optionModalRef = useRef<Modalize>(null);

  const {
    expenseList,
    categoryList,
    fetchMoreExpense,
    resetFilterForm,
    resetExpenseForm
  } = useExpense();

  const groupedExpenses = useMemo(() => groupExpenseByDate(expenseList), [expenseList]);
  const isLoading = useExpenseState((state) => state.isLoading);
  const isLoadingMore = useExpenseState((state) => state.isLoadingMore);
  const selectedExpense = useExpenseState((state) => state.selectedExpense);
  const isModifyingExpense = useExpenseState((state) => state.isModifyingExpense);
  const setModalType = useExpenseState((state) => state.setModalType);
  const setSelectedExpense = useExpenseState((state) => state.setSelectedExpense);
  const setExpenseList = useExpenseState((state) => state.setExpenseList);



  const onOpen = () => {
    resetFilterForm()
    modalizeRef.current?.open();
  };

  const openCreateModal = () => {
    setModalType('add')
    setSelectedExpense(null)
    resetExpenseForm();
    createModalRef.current?.open();
  };

  const deleteExpense = async () => {
    try {
      await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.DELETE_EXPENSE, {
        id: selectedExpense?.id
      });
      setExpenseList([...expenseList.filter((item) => item.id !== selectedExpense?.id)])
      modalizeRef.current?.close();
      deleteModalRef.current?.close()
    } catch (error) {
      console.log("Error deleting expense: ", error);
    }
  }


  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
        {isLoading ? (
          <View className="flex flex-col justify-center items-center h-full w-full">
            <Loader />
          </View>
        ) : (
          <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[42px]">
            {/* Header Section */}
            <View className="flex flex-row justify-between items-center w-full">
              <TouchableOpacity onPress={openCreateModal}>
                <CirclePlus color="white" size={30} />
              </TouchableOpacity>
              <Text className="text-white font-urbanist-bold text-[24px]">Expenses</Text>
              <TouchableOpacity onPress={onOpen}>
                <SlidersHorizontal color="white" size={28} />
              </TouchableOpacity>
            </View>

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
              onEndReached={fetchMoreExpense} // Trigger when near bottom
              onEndReachedThreshold={0.5}
              ListFooterComponent={isLoadingMore ? <Loader /> : null}
              maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
            />
          </View>
        )}
      </SafeAreaView>
      <FilterExpenseModal
        modalizeRef={modalizeRef}
        categoryList={categoryList}
      />
      <AddExpenseModal modalizeRef={createModalRef}/>
      <AppModal
        modalizeRef={deleteModalRef}
        title="Delete Expense"
        description="Are you sure you want to delete this expense?"
        proceedAction={deleteExpense}
        proceedButtonLabel="Delete"
        isLoading={isModifyingExpense}
      />
      <ExpenseOptionModal
        modalizeRef={optionModalRef}
        createModalRef={createModalRef}
        deleteModalRef={deleteModalRef}
      />
    </>
  );
};
export default ExpensesScreen;
