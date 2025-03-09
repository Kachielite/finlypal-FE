import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo, useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react-native';
import { groupExpenseByDate } from '@/src/core/utils/groupExpenseByDate';
import ExpensesList from '@/src/feature/expenses/presentation/components/expenses-list';
import { Modalize } from 'react-native-modalize';
import FilterExpenseModal from '@/src/feature/expenses/presentation/components/filter-expense-modal';
import useExpense from '@/src/feature/expenses/presentation/state/useExpense';
import Loader from '@/src/shared/presentation/components/loader';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';


const ExpensesScreen = () => {
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const modalizeRef = useRef<Modalize>(null);

  const {
    expenseList,
    categoryList,
    watch,
    setValue,
    handleSubmit,
    errors,
    fetchMoreExpense
  } = useExpense(modalizeRef);

  const groupedExpenses = useMemo(() => groupExpenseByDate(expenseList), [expenseList]);
  const isLoading = useExpenseState((state) => state.isLoading);
  const isLoadingMore = useExpenseState((state) => state.isLoadingMore);


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
              <Text className="text-white font-urbanist-bold text-[24px]">Expenses</Text>
              <TouchableOpacity onPress={onOpen}>
                <SlidersHorizontal color="white" size={28} />
              </TouchableOpacity>
            </View>

            {/* Expenses List with FlatList */}
            <FlatList
              data={groupedExpenses}
              keyExtractor={(item) => item.date} // Ensure unique keys
              renderItem={({ item }) => <ExpensesList data={item} />}
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
        watch={watch}
        setValue={setValue}
        handleSubmit={handleSubmit}
        errors={errors}
      />
    </>
  );
};
export default ExpensesScreen;
