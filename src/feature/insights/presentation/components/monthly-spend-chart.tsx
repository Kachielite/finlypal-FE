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
const generateMonthLabels = () => {
  return Array.from({ length: 12 }, (_, i) => {
    const date = moment().subtract(11 - i, 'months'); // Rolling 12-month window
    return date.format('MMM').substring(0, 2); // Ensure it matches day format
  });
};

const MonthlySpendChart = () => {
  const monthlySpendIncome = useInsightsState((state) => state.monthlySpendingIncome);
  const monthlySpendExpense = useInsightsState((state) => state.monthlySpendingExpense);

  const monthLabels = generateMonthLabels();

  // Generate bar data dynamically
  const barData = monthLabels.flatMap((month, index) => [
    {
      value: monthlySpendIncome[index]?.totalSpend || 0, // Prevent undefined values
      label: month,
      spacing: 1, // Adjust spacing
      labelWidth: 20,
      labelTextStyle: { color: '#A0AEC0', fontSize: 12 },
      frontColor: '#17CE92',
    },
    {
      value: monthlySpendExpense[index]?.totalSpend || 0, // Prevent undefined values
      frontColor: '#CE174B',
    },
  ]);

  return (
    <View className="flex flex-col justify-center items-start py-[20px] px-[15px] w-full bg-alternative gap-y-[16px] rounded-[12px]">
      <Text className="text-white font-urbanist-bold text-[18px]">Monthly Spend</Text>
      <BarChart
        stepHeight={10}
        data={barData}
        barWidth={9} // Adjust width for visibility
        spacing={6.4} // Ensure bars fit within the screen
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