import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef } from 'react';
import { SlidersHorizontal } from 'lucide-react-native';
import { groupExpenseByDate } from '@/src/core/utils/groupExpenseByDate';
import ExpensesList from '@/src/feature/expenses/presentation/components/expenses-list';
import { Modalize } from 'react-native-modalize';
import FilterExpenseModal from '@/src/feature/expenses/presentation/components/filter-expense-modal';
import useExpense from '@/src/feature/expenses/presentation/state/useExpense';
import Loader from '@/src/shared/presentation/components/loader';


const ExpensesScreen = () => {
  const modalizeRef = useRef<Modalize>(null);
  const {isLoading, expenseList, watch, setValue, handleSubmit, errors} = useExpense();

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
        {
          isLoading ?
            <View className="flex flex-col justify-center items-center h-full w-full">
              <Loader/>
            </View>
            :
            <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-[40px] gap-y-[42px]">
              <View className="flex flex-row justify-between items-center w-full">
                <Text className="text-white font-urbanist-bold text-[24px]">Expenses</Text>
                <TouchableOpacity onPress={onOpen}>
                  <SlidersHorizontal color="white" size={28}/>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false} className="w-full">
                {groupExpenseByDate(expenseList).map((item) => <ExpensesList key={item.date} data={item} />)}
              </ScrollView>
            </View>
        }
      </SafeAreaView>
      <FilterExpenseModal modalizeRef={modalizeRef}/>
    </>
  );
};
export default ExpensesScreen;
