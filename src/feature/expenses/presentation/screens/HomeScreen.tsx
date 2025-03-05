import { SafeAreaView, Text, View } from 'react-native';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';
import WelcomeScreen from '@/src/feature/authentication/presentation/screens/WelcomeScreen';
import React from 'react';
import BalanceCard from '@/src/feature/expenses/presentation/components/home/balance-card';
import ExpenseSummary from '@/src/feature/expenses/presentation/components/home/expense-summary';
import QuickActions from '@/src/feature/expenses/presentation/components/home/quick-actions';

const HomeScreen = () => {
  const {token, user} = useAuthState.getState()

  if(!token || !user) {
    return <WelcomeScreen/>
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#102632' }}>
      <View className="w-full flex flex-col justify-start items-start h-full px-[24px] pt-[16px] gap-y-[38px]">
        <View className="flex flex-col justify-start items-start gap-y-[8px]">
          <Text className="text-white font-urbanist-bold text-[24px]">{user.name}</Text>
          <Text className="text-[#E0E0E0] text-sm text-[16px]" >Welcome back! 👋</Text>
        </View>
        <BalanceCard/>
        <ExpenseSummary/>
        <QuickActions/>
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
