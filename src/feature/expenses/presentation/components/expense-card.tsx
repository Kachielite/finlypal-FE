import { Text, View } from 'react-native';
import React from 'react';
import { ArrowBigDown, ArrowBigUp } from 'lucide-react-native';
import formatNumber from '@/src/core/utils/formatCurrency';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';


const ExpenseCard = ({expense} : {expense: Expense}) => {
  return (
    <View className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] py-4">
      <View className="flex flex-row justify-start items-center gap-x-[12px]">
        {expense.type === 'EXPENSE' && <ArrowBigDown color="#CE174B" size={24}/>}
        {expense.type === 'INCOME' && <ArrowBigUp color="#17CE92" size={24}/>}
        <View className="flex flex-col justify-start items-start gap-y-[8px]">
          <Text className="text-white font-urbanist-bold text-[20px]">{expense?.description?.split(" ").slice(0, 2).join(' ')}</Text>
          <Text className="text-white font-urbanist-normal text-[14px]">{expense?.categoryName}</Text>
        </View>
      </View>
      <Text className={`font-urbanist-semibold text-[18px] ${expense.type === 'EXPENSE' ? 'text-[#CE174B]' : 'text-[#17CE92]'}`}>
        {expense.type === 'EXPENSE' ? '-' : '+'}
        ${formatNumber(expense.amount)}
      </Text>
    </View>
  );
};
export default ExpenseCard;
