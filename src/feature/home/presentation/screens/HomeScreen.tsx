import { SafeAreaView, Text, View } from 'react-native';
import React from 'react';
import BalanceCard from '@/src/feature/home/presentation/components/balance-card';
import ExpenseSummary from '@/src/feature/home/presentation/components/expense-summary';
import QuickActions from '@/src/feature/home/presentation/components/quick-actions';
import RecentTransactions from '@/src/feature/home/presentation/components/recent-transactions';
import useHomeHooks from '@/src/feature/home/presentation/state/useHomeHooks';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';

const HomeScreen = () => {
  const { user} = useAuthState.getState();
  const {isLoading, totalIncome, totalExpense, expensesList} = useHomeHooks();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
      <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] gap-y-[24px]">
        <View className="flex flex-col justify-start items-start gap-y-[8px]">
          <Text className="text-white font-urbanist-bold text-[24px]">{user?.name}</Text>
          <Text className="text-[#E0E0E0] text-[14px]" >Welcome back! 👋</Text>
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
