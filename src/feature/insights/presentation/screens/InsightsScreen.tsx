import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { SlidersHorizontal } from 'lucide-react-native';
import FilterInsightsModal from '@/src/feature/insights/presentation/components/filter-insights-modal';
import { Modalize } from 'react-native-modalize';
import InsightsExpenseSummary from '@/src/feature/insights/presentation/components/insights-expense-summary';
import MonthlySpendChart from '@/src/feature/insights/presentation/components/monthly-spend-chart';
import CategoryExpenseChart from '@/src/feature/insights/presentation/components/category-expense-chart';
import moment from 'moment';
import TopExpensesIncomesList from '@/src/feature/insights/presentation/components/top-expenses-incomes-list';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';

const InsightsScreen = () => {

  const currency = useAuthState((state) => state.user?.currency?.symbol);
  const modalizeRef = React.useRef<Modalize>(null);
  const startDate = useInsightsState((state) => state.startDate)
  const endDate = useInsightsState((state) => state.endDate)
  const totalIncomeSpendByCategory = useInsightsState((state) => state.totalIncomeSpendByCategory);
  const totalExpenseSpendByCategory = useInsightsState((state) => state.totalExpenseSpendByCategory)


  const onOpen = () => {
    modalizeRef.current?.open();
  };


  return (
    <>
      <SafeAreaView className="flex-1 bg-[#102632] w-[100vw]">
        <View className="w-full flex flex-col justify-start items-center h-full px-[24px] pt-[16px] gap-y-[24px]">
          <View className="flex flex-row justify-between items-center w-full">
            <View/>
            <Text className="text-white font-urbanist-bold text-[24px]">Insights</Text>
            <TouchableOpacity onPress={onOpen}>
              <SlidersHorizontal color="white" size={28} />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row flex-wrap justify-between items-center w-full">
            <Text className="text-white font-urbanist-bold text-[18px]">Spend Overview</Text>
            <Text className="text-white font-urbanist-bold text-[12px]">
              {moment(startDate).format("DD MMM YYYY")} - {moment(endDate).format("DD MMM YYYY")}
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerClassName="w-full flex flex-col justify-start items-start gap-y-[24px] pb-20"
          >
            <InsightsExpenseSummary currency={currency}/>
            <MonthlySpendChart/>
            <CategoryExpenseChart data={totalIncomeSpendByCategory} type="income"/>
            <CategoryExpenseChart data={totalExpenseSpendByCategory} type="expense"/>
            <TopExpensesIncomesList currency={currency}/>
          </ScrollView>
        </View>
      </SafeAreaView>
      <FilterInsightsModal  modalizeRef={modalizeRef}/>
    </>
  );
};
export default InsightsScreen;
