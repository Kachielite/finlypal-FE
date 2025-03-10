import { FlatList, Text, View } from 'react-native';
import React from 'react';
import { PieChart } from 'react-native-gifted-charts';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';

// Expanded color palette (20 unique colors)
const categoryColors = [
  '#009FFF', '#93FCF8', '#BDB2FA', '#FFA5BA', '#FFCD56', '#4CAF50', '#FF7043', '#D500F9', '#00C853', '#795548',
  '#607D8B', '#FFC107', '#8BC34A', '#FF5722', '#3F51B5', '#E91E63', '#00ACC1', '#9E9E9E', '#FF9800', '#4DB6AC',
];

const CategorySpendChart = () => {
  const totalSpendByCategory = useInsightsState((state) => state.totalSpendByCategory);

  if (!totalSpendByCategory || totalSpendByCategory.length === 0) {
    return <Text style={{ color: 'white', textAlign: 'center' }}>No data available</Text>;
  }

  // Find the max percentage
  const maxPercent = Math.max(...totalSpendByCategory.map((item) => item.percent));

  // Transform data into PieChart format, making largest category(ies) focused
  const pieData = totalSpendByCategory.map((item, index) => ({
    value: item.percent,
    color: categoryColors[index % categoryColors.length],
    gradientCenterColor: categoryColors[index % categoryColors.length],
    focused: item.percent === maxPercent, // Focus only the biggest categories
  }));

  // Render category legend in a FlatList for horizontal scrolling
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
      <Text className="text-white font-urbanist-bold text-[18px] self-start">Top Spend by Category</Text>

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
              <Text style={{ fontSize: 14, color: 'white', fontWeight: 'bold' }}>
                {maxPercent}%
              </Text>
              <Text style={{ fontSize: 12, color: 'white' }}>
                {totalSpendByCategory.filter(item => item.percent === maxPercent).map(item => item.category).join(', ')}
              </Text>
            </View>
          )}
        />
      </View>

      {/* Horizontal Scrollable Legend */}
      <FlatList
        data={totalSpendByCategory}
        renderItem={renderLegendItem}
        keyExtractor={(item) => item.category}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 5 }}
      />
    </View>
  );
};

export default CategorySpendChart;