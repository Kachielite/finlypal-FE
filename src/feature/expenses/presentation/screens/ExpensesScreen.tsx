import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SlidersHorizontal } from 'lucide-react-native';
import { groupExpenseByDate } from '@/src/core/utils/groupExpenseByDate';
import ExpensesList from '@/src/feature/expenses/presentation/components/expenses-list';

const data =  [
    {
      id: 100701,
      description: "Entertainment",
      amount: 497530.68,
      date: "2025-01-09",
      type: "INCOME",
      categoryId: 1051,
      categoryName: "Hobbies"
    },
    {
      id: 101001,
      description: "Rent",
      amount: 531950.49,
      date: "2025-01-30",
      type: "INCOME",
      categoryId: 551,
      categoryName: "Fuel"
    },
    {
      id: 102151,
      description: "Transportation",
      amount: 371606.57,
      date: "2025-02-01",
      type: "INCOME",
      categoryId: 151,
      categoryName: "Business Income"
    },
    {
      id: 102501,
      description: "Groceries",
      amount: 640040.58,
      date: "2025-01-10",
      type: "INCOME",
      categoryId: 1551,
      categoryName: "Charity"
    },
    {
      id: 103351,
      description: "Groceries",
      amount: 420754.54,
      date: "2025-02-02",
      type: "INCOME",
      categoryId: 1301,
      categoryName: "Retirement Savings"
    },
    {
      id: 103551,
      description: "Rent",
      amount: 280598.49,
      date: "2025-01-01",
      type: "INCOME",
      categoryId: 451,
      categoryName: "Utilities"
    },
    {
      id: 103951,
      description: "Utilities",
      amount: 82061.48,
      date: "2025-01-20",
      type: "EXPENSE",
      categoryId: 151,
      categoryName: "Business Income"
    },
    {
      id: 104251,
      description: "Utilities",
      amount: 728470.78,
      date: "2025-01-02",
      type: "EXPENSE",
      categoryId: 1301,
      categoryName: "Retirement Savings"
    },
    {
      id: 104701,
      description: "Salary",
      amount: 570443.49,
      date: "2025-02-03",
      type: "INCOME",
      categoryId: 1,
      categoryName: "Salary"
    },
    {
      id: 105301,
      description: "Salary",
      amount: 480918.44,
      date: "2025-01-10",
      type: "INCOME",
      categoryId: 701,
      categoryName: "Groceries"
    }
  ]

const ExpensesScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
      <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] pb-20 gap-y-[42px]">
        <View className="flex flex-row justify-between items-center w-full">
          <Text className="text-white font-urbanist-bold text-[24px]">Expenses</Text>
          <TouchableOpacity>
            <SlidersHorizontal color="white" size={28}/>
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="w-full">
          {groupExpenseByDate(data).map((item) => <ExpensesList key={item.date} data={item} />)}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
export default ExpensesScreen;
