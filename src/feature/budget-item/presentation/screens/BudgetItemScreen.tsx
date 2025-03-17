import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useRef } from 'react';
import Loader from '@/src/shared/presentation/components/loader';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import BalanceCard from '@/src/feature/budget-item/presentation/components/balance-card';
import useBudgetItem from '@/src/feature/budget-item/presentation/state/useBudgetItem';
import { groupExpenseByDate } from '@/src/core/utils/groupExpenseByDate';
import ExpensesList from '@/src/feature/expenses/presentation/components/expenses-list';
import AddExpenseModal from '@/src/feature/expenses/presentation/components/add-expense-modal';
import AppModal from '@/src/shared/presentation/components/app-modal';
import ExpenseOptionModal from '@/src/feature/expenses/presentation/components/expense-option-modal';
import { Modalize } from 'react-native-modalize';
import EmptyTransactionList from '@/src/feature/home/presentation/components/empty-transaction-list';


const BudgetItemScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const createModalRef = useRef<Modalize>(null);
  const deleteModalRef = useRef<Modalize>(null);
  const optionModalRef = useRef<Modalize>(null);

  const {budget_item_id} = useLocalSearchParams<{ budget_item_id: string}>()
  const {} = useBudgetItem({budget_item_id});

  const isLoadingSelectedBudgetItem = useBudgetItemState((state) => state.isLoadingSelectedBudgetItem);
  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);
  const groupedExpenses = selectedBudgetItem && useMemo(() => groupExpenseByDate(selectedBudgetItem.expenses), [selectedBudgetItem.expenses]);


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
              <BalanceCard budgetItem={selectedBudgetItem} />
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
        <AddExpenseModal modalizeRef={createModalRef}/>
        <AppModal
          modalizeRef={deleteModalRef}
          title="Delete Expense"
          description="Are you sure you want to delete this expense?"
          proceedAction={() => console.log()}
          proceedButtonLabel="Delete"
          isLoading={false}
          includeTabPadding
        />
        <ExpenseOptionModal
          modalizeRef={optionModalRef}
          createModalRef={createModalRef}
          deleteModalRef={deleteModalRef}
        />
      </>
  );
};
export default BudgetItemScreen;
