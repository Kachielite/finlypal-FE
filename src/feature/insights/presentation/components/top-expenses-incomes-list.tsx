import { FlatList, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';
import IncomeExpenseSwitch from '@/src/feature/insights/presentation/components/income-expense-switch';
import moment from 'moment/moment';
import formatNumber from '@/src/core/utils/formatCurrency';

const TopExpensesIncomesList = () => {
  const topExpensesList = useInsightsState((state) => state.topExpenses);
  const topIncomesList = useInsightsState((state) => state.topIncomes);

  const [selected, setSelected] = useState("income");



  return (
    <View className="flex flex-col justify-center items-center py-[20px] px-[15px] w-full bg-alternative gap-y-[16px] rounded-[12px] max-h-[500px]">
      <Text className="text-white font-urbanist-bold text-[18px] capitalize w-full self-start">Top {selected} Spend</Text>
      <IncomeExpenseSwitch onToggle={(value) => setSelected(value)} />
      {/* Expenses List with FlatList */}
      <FlatList
        data={selected === "income" ? topIncomesList : topExpensesList}
        keyExtractor={(_, index) => index.toString()} // Use index for unique keys
        renderItem={({ item }) =>
          <View className="flex flex-row justify-between items-center w-full border-b-[1px] border-b-[#35383F] py-4">
            <View className="flex flex-row justify-start items-center gap-x-[12px]">
              <View className="flex flex-col justify-start items-start gap-y-[4px]">
                <Text className="text-white font-urbanist-bold text-[18px]">{item.description.split(" ").slice(0, 2).join(' ')}</Text>
                <Text className="text-white text-[12px]">{moment(item.date).format('DD MMM, YYYY')}</Text>
              </View>
            </View>
            <Text className={`font-urbanist-semibold text-[16px] ${selected.toUpperCase() === 'EXPENSE' ? 'text-[#CE174B]' : 'text-[#17CE92]'}`}>
              {selected.toUpperCase()  === 'EXPENSE' ? '-' : '+'}
              ${formatNumber(item.amount)}
            </Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }} // Preserve bottom spacing
      />
    </View>
  );
};
export default TopExpensesIncomesList
;
