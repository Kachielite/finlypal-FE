import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SlidersHorizontal } from 'lucide-react-native';
import FilterInsightsModal from '@/src/feature/insights/presentation/components/filter-insights-modal';
import { Modalize } from 'react-native-modalize';
import InsightsExpenseSummary from '@/src/feature/insights/presentation/components/insights-expense-summary';
import MonthlySpendChart from '@/src/feature/insights/presentation/components/monthly-spend-chart';

const InsightsScreen = () => {
  const modalizeRef = React.useRef<Modalize>(null);


  const onOpen = () => {
    modalizeRef.current?.open();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
        <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] gap-y-[24px]">
          <View className="flex flex-row justify-between items-center w-full">
            <View/>
            <Text className="text-white font-urbanist-bold text-[24px]">Insights</Text>
            <TouchableOpacity onPress={onOpen}>
              <SlidersHorizontal color="white" size={28} />
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerClassName="w-full flex flex-col justify-start items-start gap-y-[24px]">
            <InsightsExpenseSummary />
            <MonthlySpendChart/>
          </ScrollView>
        </View>
      </SafeAreaView>
      <FilterInsightsModal  modalizeRef={modalizeRef}/>
    </>
  );
};
export default InsightsScreen;
