import { Text, View } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';
import moment from 'moment';

// Function to format values as K (thousands) or M (millions)
const formatValue = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`; // Millions
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`; // Thousands
  return `${value}`; // Less than 1K
};

// Generate month labels dynamically
const generateMonthLabels = (data: { month: string }[]) => {
  return data.map((item) => moment(item.month, 'YYYY-MM').format('MMM'));
};

const MonthlySpendChart = () => {
  const monthlySpendIncome = useInsightsState((state) => state.monthlySpendingIncome);
  const monthlySpendExpense = useInsightsState((state) => state.monthlySpendingExpense);

  const monthLabels = generateMonthLabels(monthlySpendIncome);

  const totalBars = monthLabels.length * 2; // 2 bars per month (Income + Expense)
  const paddingBars = Math.max(0, (12 - totalBars) / 2);

  const barData = [
    ...Array(paddingBars).fill({ value: 0, frontColor: 'transparent' }),
    ...monthLabels.flatMap((month, index) => [
      {
        value: monthlySpendIncome[index]?.totalSpend || 0,
        label: month,
        frontColor: '#17CE92',
        labelTextStyle: { color: '#A0AEC0', fontSize: 10 },
      },
      {
        value: monthlySpendExpense[index]?.totalSpend || 0,
        frontColor: '#CE174B',
      },
    ]),
    ...Array(paddingBars).fill({ value: 0, frontColor: 'transparent' }),
  ];

  return (
    <View className="flex flex-col justify-center items-start py-[20px] pl-[15px] w-[88vw] bg-alternative gap-y-[16px] rounded-[12px]">
      <Text className="text-white font-urbanist-bold text-[18px]">Monthly Spend</Text>
      <BarChart
        stepHeight={12}
        data={barData}
        barWidth={9} // Adjust width for visibility
        spacing={11} // Ensure bars fit within the screen
        roundedTop
        roundedBottom
        hideRules
        xAxisThickness={0}
        yAxisThickness={0}
        yAxisTextStyle={{ color: '#A0AEC0' }}
        noOfSections={15} // Adjust for better Y-axis readability
        yAxisLabelTexts={[0, 10_000, 50_000, 100_000, 500_000, 1_000_000].map(formatValue)} // Format Y-axis labels
        yAxisLabelWidth={0}
      />
      <View className="flex flex-row justify-center items-center gap-x-[24px] w-full">
        <View className="flex flex-row justify-center items-center gap-x-[8px]">
          <View className="h-3 w-3 bg-secondary rounded-full"/>
          <Text className="font-urbanist-bold text-[14px] text-white">Income</Text>
        </View>
        <View className="flex flex-row justify-center items-center gap-x-[8px]">
          <View className="h-3 w-3 bg-expense rounded-full"/>
          <Text className="font-urbanist-bold text-[14px] text-white">Expense</Text>
        </View>
      </View>
    </View>
  );
};

export default MonthlySpendChart;