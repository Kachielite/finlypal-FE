import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import TransactionCard from '@/src/feature/home/presentation/components/transaction-card';
import EmptyTransactionList from '@/src/feature/home/presentation/components/empty-transaction-list';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';

// const transactions = [
//   { id: 1, description: "Groceries", amount: 656, date: "2023-05-01", type: "EXPENSE" },
//   { id: 2, description: "Salary", amount: 1600, date: "2023-05-01", type: "INCOME" },
//   { id: 3, description: "Entertainment", amount: 230, date: "2023-05-01", type: "EXPENSE" },
//   { id: 4, description: "Rent", amount: 343, date: "2023-05-01", type: "EXPENSE" },
//   { id: 5, description: "Utilities", amount: 100, date: "2023-05-01", type: "EXPENSE" },
//   { id: 6, description: "Investment", amount: 4342, date: "2023-05-01", type: "INCOME" },
// ];

const RecentTransactions = ({expenseList}: {expenseList: Expense[]}) => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-white font-urbanist-bold text-[20px]">Recent Actions</Text>
        <TouchableOpacity>
          <Text className="text-white text-[16px]">See All</Text>
        </TouchableOpacity>
      </View>
      <View className="rounded-lg bg-[#1E2A32] p-[12px] max-h-[300px] w-full">
        <FlatList
          data={expenseList}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          alwaysBounceVertical={false}
          ListEmptyComponent={<EmptyTransactionList />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 60,
            gap: 20
          }}
          renderItem={({ item }) => (
            <TransactionCard id={item.id} amount={item.amount} date={item.date} description={item.description} type={item.type} />
          )}
        />
      </View>
    </View>
  );
};
export default RecentTransactions;


