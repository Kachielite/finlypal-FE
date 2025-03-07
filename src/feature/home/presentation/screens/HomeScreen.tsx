import { SafeAreaView, Text, View } from 'react-native';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import React, { useCallback, useEffect } from 'react';
import BalanceCard from '@/src/feature/home/presentation/components/balance-card';
import ExpenseSummary from '@/src/feature/home/presentation/components/expense-summary';
import QuickActions from '@/src/feature/home/presentation/components/quick-actions';
import RecentTransactions from '@/src/feature/home/presentation/components/recent-transactions';
import { useHomeState } from '@/src/feature/home/presentation/state/homeState';
import { homeBloc } from '@/src/feature/home/presentation/state/homeBloc';
import { HOME_EVENTS } from '@/src/feature/home/presentation/state/homeEvent';
import Loader from '@/src/shared/presentation/components/loader';

const HomeScreen = () => {
  const {token, user} = useAuthState.getState();
  const {isLoading, isLoadingExpenseList, expensesList, totalExpense, totalIncome} = useHomeState.getState();

  if(!token || !user) {
    return <WelcomeScreen/>
  }

  // const {startDate, endDate} = getCurrentMonthStartEnd();
  const startDate = '2024-01-01';
  const endDate = '2024-12-31';

  const getExpenseList = useCallback(async () => {
     await homeBloc.handleHomeEvent(HOME_EVENTS.GET_EXPENSES, {startDate, endDate});
  },[]);

  const getTotalIncome = useCallback(async() => {
    await homeBloc.handleHomeEvent(HOME_EVENTS.GET_TOTAL_INCOME, {type: 'INCOME', startDate, endDate} )
  }, []);

  const getTotalExpense = useCallback(async() => {
    await homeBloc.handleHomeEvent(HOME_EVENTS.GET_TOTAL_INCOME, {type: 'EXPENSE', startDate, endDate} )
  }, []);

  useEffect(() => {
    (async () => {
      await getExpenseList();
      await getTotalExpense();
      await getTotalIncome();
    })();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
      <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] gap-y-[24px]">
        <View className="flex flex-col justify-start items-start gap-y-[8px]">
          <Text className="text-white font-urbanist-bold text-[24px]">{user.name}</Text>
          <Text className="text-[#E0E0E0] text-sm text-[16px]" >Welcome back! 👋</Text>
        </View>
        <BalanceCard balance={totalIncome - totalExpense}/>
        <ExpenseSummary income={totalIncome} expense={totalExpense}/>
        <QuickActions/>
        {isLoadingExpenseList ? <Loader/> : <RecentTransactions expenseList={expensesList}/>}

      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
