import { SafeAreaView, Text, View } from 'react-native';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import React, { useEffect } from 'react';
import BalanceCard from '@/src/feature/home/presentation/components/balance-card';
import ExpenseSummary from '@/src/feature/home/presentation/components/expense-summary';
import QuickActions from '@/src/feature/home/presentation/components/quick-actions';
import RecentTransactions from '@/src/feature/home/presentation/components/recent-transactions';
import { useHomeState } from '@/src/feature/home/presentation/state/homeState';
import { homeBloc } from '@/src/feature/home/presentation/state/homeBloc';
import { HOME_EVENTS } from '@/src/feature/home/presentation/state/homeEvent';
import { Redirect } from 'expo-router';
import moment from 'moment';

const HomeScreen = () => {
  const {token, user} = useAuthState.getState();

  if(!token || !user) {
    return <Redirect href="/authentication/welcome"/>
  }

  // Mocked Date Range
  const today = moment();
  const startDate = today.startOf('month').format('YYYY-MM-DD');
  const endDate = today.endOf('month').format('YYYY-MM-DD');

  const isLoading = useHomeState((state) => state.isLoading);
  const totalIncome = useHomeState((state) => state.totalIncome);
  const totalExpense = useHomeState((state) => state.totalExpense);
  const expensesList = useHomeState((state) => state.expensesList);

  useEffect(() => {
    const fetchData = async () => {
      useHomeState.getState().setIsLoading(true);
      try {
        await Promise.all([
          homeBloc.handleHomeEvent(HOME_EVENTS.GET_EXPENSES, { startDate, endDate }),
          homeBloc.handleHomeEvent(HOME_EVENTS.GET_TOTAL_EXPENSE, { type: 'EXPENSE', startDate, endDate }),
          homeBloc.handleHomeEvent(HOME_EVENTS.GET_TOTAL_INCOME, { type: 'INCOME', startDate, endDate })
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        useHomeState.getState().setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
      <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] gap-y-[24px]">
        <View className="flex flex-col justify-start items-start gap-y-[8px]">
          <Text className="text-white font-urbanist-bold text-[24px]">{user.name}</Text>
          <Text className="text-[#E0E0E0] text-sm text-[16px]" >Welcome back! 👋</Text>
        </View>
        <BalanceCard balance={(totalIncome - totalExpense)}/>
        <ExpenseSummary income={totalIncome} expense={totalExpense}/>
        <QuickActions/>
         <RecentTransactions expenseList={expensesList} isLoading={isLoading}/>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
