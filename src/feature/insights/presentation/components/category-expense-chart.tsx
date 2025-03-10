import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';

// Expanded color palette (20 unique colors)
const categoryColors = [
  '#17CE92', // Main Secondary (Bright Green)
  '#0D7051', // Darker Green (Secondary Variant)
  '#B51236', // Deep True Red (Expense Variant)
  '#102632', // Main Primary (Dark Blue)
  '#CE174B', // Main Expense Red
  '#2A5C6E', // Blue-Tinted Primary Variant
  '#A51129', // Dark Bold Red (Expense Variant)
  '#14B483', // Aqua-Green (Secondary Variant)
  '#8C0E20', // Rich Crimson Red (Expense Variant)
  '#153947', // Muted Dark Blue (Primary Variant)
];

const CategoryExpenseChart = () => {
  const totalSpendByCategory = useInsightsState((state) => state.totalExpenseSpendByCategory);

  if (!totalSpendByCategory || totalSpendByCategory.length === 0) {
    return <Text style={{ color: 'white', textAlign: 'center' }}>No data available</Text>;
  }

  // Sort categories by percentage (highest to lowest)
  const sortedCategories = [...totalSpendByCategory].sort((a, b) => b.percent - a.percent);

  // Extract top 9 categories
  const topCategories = sortedCategories.slice(0, 9);

// Sum percentages & total spend of remaining categories and group under "Others"
  const remainingCategories = sortedCategories.slice(9);
  const othersTotalPercent = remainingCategories.reduce((sum, item) => sum + item.percent, 0);
  const othersTotalSpend = remainingCategories.reduce((sum, item) => sum + item.totalSpend, 0);

  if (othersTotalPercent > 0) {
    topCategories.push({ category: 'Others', percent: othersTotalPercent, totalSpend: othersTotalSpend });
  }

  // Find the highest percentage(s)
  const maxPercent = topCategories[0]?.percent;

  // Format data for PieChart, making the biggest category(ies) focused
  const pieData = topCategories.map((item, index) => ({
    value: item.percent,
    color: categoryColors[index % categoryColors.length],
    gradientCenterColor: categoryColors[index % categoryColors.length],
    focused: item.percent === maxPercent, // Highlight only the biggest category(ies)
  }));

  // Render each category in a horizontally scrolling FlatList
  const renderLegendItem = ({ item, index }: { item: any; index: number }) => (
    <View key={item.category} style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
      <View style={{
        height: 10, width: 10, borderRadius: 5,
        backgroundColor: categoryColors[index % categoryColors.length],
        marginRight: 8,
      }} />
      <Text style={{ color: 'white' }}>{item.category}: {item.percent}%</Text>
    </View>
  );

  return (
    <View className="flex flex-col justify-center items-center py-[20px] px-[15px] w-full bg-alternative gap-y-[24px] rounded-[12px]">
      <Text className="text-white font-urbanist-bold text-[18px] self-start">Top Categories by Expense</Text>
      <View className="w-full flex flex-col justify-center items-center">
        <PieChart
          data={pieData}
          donut
          showGradient
          sectionAutoFocus
          radius={90}
          innerRadius={60}
          innerCircleColor={'#1E2A32'}
          centerLabelComponent={() => (
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>
                {maxPercent}%
              </Text>
              <Text style={{ fontSize: 12, color: 'white' }}>
                {topCategories.filter(item => item.percent === maxPercent)[0].category}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Horizontal Scrollable Legend */}
      <FlatList
        data={topCategories}
        renderItem={renderLegendItem}
        keyExtractor={(item) => item.category}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
      />
    </View>
  );
};

export default CategoryExpenseChart;