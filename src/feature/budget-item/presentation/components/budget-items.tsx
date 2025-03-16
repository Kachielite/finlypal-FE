import React from 'react';
import { FlatList, Text, View } from 'react-native';
import EmptyTransactionList from '@/src/feature/home/presentation/components/empty-transaction-list';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import BudgetItemList from '@/src/feature/budget-item/presentation/components/budget-item-list';
import { BudgetItemModel } from '@/src/feature/budget-item/data/model/budget-item-model';

const BudgetItemsList = ({budgetItems}:{budgetItems: BudgetItem[]}) => {
  const formatedBudgetItems = BudgetItemModel.fromJsonList(budgetItems)
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-white font-urbanist-bold text-[20px]">Budget items</Text>
      </View>
      <View className="rounded-xl p-[12px] max-h-[60vh] w-full bg-alternative shadow-md">
        <FlatList
          data={formatedBudgetItems?.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          alwaysBounceVertical={false}
          ListEmptyComponent={<EmptyTransactionList />}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: 10,
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


