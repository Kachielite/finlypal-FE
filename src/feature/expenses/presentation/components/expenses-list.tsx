import { Text, View } from 'react-native';
import React from 'react';
import moment from 'moment';
import ExpenseCard from '@/src/feature/expenses/presentation/components/expense-card';
import { ExpenseData } from '@/src/core/utils/groupExpenseByDate';


const ExpensesList = ({data}: { data: ExpenseData}) => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px] mb-5">
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-white font-urbanist-bold text-[18px]">{moment(data.date).format('DD MMM, YYYY')}</Text>
      </View>
      <View className="rounded-lg bg-[#1E2A32] px-[12px] w-full">
        {data.expenses.map((item) => <ExpenseCard key={item.id} expense={item} />)}
      </View>
    </View>
  );
};
export default ExpensesList;
