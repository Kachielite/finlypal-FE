import React from 'react';
import { FlatList, Text, View } from 'react-native';
import CategoryCard from '@/src/feature/home/presentation/components/home/category-card';

const themeColors = {
  primary: 'bg-[#102632]', // Dark Blue
  secondary: 'bg-[#17CE92]', // Green
  tertiary: 'bg-[#17CE92]', // White
  card1: '#35383F', // Deep Blue
  card2: 'rgba(23,206,146,0.81)', // Orange
  card3: '#35383F', // Light Blue
};

const categories = [
  { id: '1', title: 'Food', amount: '$45.00', color: themeColors.card1 },
  { id: '2', title: 'Clothing', amount: '$150.00', color: themeColors.card2 },
  { id: '3', title: 'Parking', amount: '$60.00', color: themeColors.card3 },
  { id: '4', title: 'Food', amount: '$45.00', color: themeColors.card1 },
  { id: '5', title: 'Clothing', amount: '$150.00', color: themeColors.card2 },
  { id: '6', title: 'Parking', amount: '$60.00', color: themeColors.card3 },
];

const TopSpends = () => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <Text className="text-white font-urbanist-bold text-[24px]">Top Spends</Text>
      <FlatList
        data={categories}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingHorizontal: 10,
          flexGrow: 1,  // Ensures full width usage
          gap: 20
        }}
        renderItem={({ item }) => (
          <CategoryCard category={item.title} amount={item.amount} color={item.color} />
        )}
      />
    </View>
  );
};
export default TopSpends;


