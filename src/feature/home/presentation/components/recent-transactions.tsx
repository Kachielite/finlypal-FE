import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import TransactionCard from '@/src/feature/home/presentation/components/transaction-card';
import EmptyTransactionList from '@/src/feature/home/presentation/components/empty-transaction-list';
import Loader from '@/src/shared/presentation/components/loader';
import { router } from 'expo-router';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';

const RecentTransactions = () => {
  const expensesList = useExpenseState((state) => state.expenseList);
  const isLoading = useExpenseState((state) => state.isLoading);
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-white font-urbanist-bold text-[20px]">Recent Actions</Text>
        <TouchableOpacity onPress={() => router.push('/(tabs)/expense')}>
          <Text className="text-white text-[16px]">See All</Text>
        </TouchableOpacity>
      </View>
      {isLoading ? (
        <View className="w-full bg-[#1E2A32] h-[300px] flex justify-center items-center">
          <Loader/>
        </View>
      ):
      <View className="rounded-lg bg-[#1E2A32] p-[12px] max-h-[40vh] w-full">
        <FlatList
          data={expensesList.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          alwaysBounceVertical={false}
          ListEmptyComponent={<EmptyTransactionList />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 90,
            gap: 20
          }}
          renderItem={({ item }) => (
            <TransactionCard id={item.id} amount={item.amount} date={item.date} description={item.description} type={item.type} />
          )}
        />
      </View>}
    </View>
  );
};
export default RecentTransactions;


