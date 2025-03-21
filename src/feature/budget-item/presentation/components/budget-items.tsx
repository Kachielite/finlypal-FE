import React from 'react';
import { FlatList, Text, View } from 'react-native';
import EmptyTransactionList from '@/src/feature/home/presentation/components/empty-transaction-list';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import BudgetItemList from '@/src/feature/budget-item/presentation/components/budget-item-list';

const BudgetItemsList = ({budgetItems}:{budgetItems: BudgetItem[]}) => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-white font-urbanist-bold text-[20px]">Budget Category</Text>
      </View>
      <View className="rounded-xl p-[12px] max-h-[50vh] w-full bg-alternative shadow-md">
        <FlatList
          data={budgetItems?.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          alwaysBounceVertical={false}
          ListEmptyComponent={<EmptyTransactionList title="No Budget Item Found" message="Get started by adding a budget item" />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingTop: 10,
            paddingHorizontal: 10,
            paddingBottom: budgetItems?.length >= 5 ? 90 : 0,
            gap: 20,
          }}
          renderItem={({ item }) => (
            <BudgetItemList budgetItem={item}/>
          )}
        />
      </View>
    </View>
  );
};
export default BudgetItemsList;


