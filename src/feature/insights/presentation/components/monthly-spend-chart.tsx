import { Text, View } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-gifted-charts';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';

// Function to format values as K (thousands) or M (millions)
const formatValue = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`; // Millions
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`; // Thousands
  return `${value}`; // Less than 1K
};

const MonthlySpendChart = () => {
  const monthlySpendIncome = useInsightsState((state) => state.monthlySpendingIncome);
  const monthlySpendExpense = useInsightsState((state) => state.monthlySpendingExpense);

  // Define months array
  const months = ['Ja', 'Fe', 'Ma', 'Ap', 'Ma', 'Ju', 'Ju', 'Au', 'Se', 'Oc', 'No', 'De'];

  // Generate bar data dynamically
  const barData = months.flatMap((month, index) => [
    {
      value: monthlySpendIncome[index]?.totalSpend || 0, // Prevent undefined values
      label: month,
      spacing: 1, // Adjust spacing
      labelWidth: 20,
      labelTextStyle: { color: '#A0AEC0' },
      frontColor: '#17CE92',
    },
    {
      value: monthlySpendExpense[index]?.totalSpend || 0, // Prevent undefined values
      frontColor: '#CE174B',
    },
  ]);

  return (
    <View className="flex flex-col justify-center items-start py-[20px] px-[15px] w-full bg-alternative gap-y-[24px] rounded-[12px]">
      <Text className="text-white font-urbanist-bold text-[18px]">Monthly Spend</Text>
      <BarChart
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
    </View>
  );
};

export default MonthlySpendChart;