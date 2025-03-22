import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import EmptyState from '@/src/shared/presentation/components/empty-state';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import SavingsItem from '@/src/feature/savings/presentation/components/savings-item';


const SavingsList = ({type, onPressSeeAll, ListItems}:{type: string, onPressSeeAll: () => void; ListItems: Savings[]}) => {
  return (
    <View className="flex flex-col justify-start items-start w-full gap-y-[18px]">
      <View className="flex flex-row justify-between items-center w-full">
        <Text className="text-white font-urbanist-bold text-[20px]">{type}</Text>
        {ListItems.length > 0 && <TouchableOpacity onPress={onPressSeeAll}>
          <Text className="text-white text-[14px]">See All</Text>
        </TouchableOpacity>}
      </View>
      {ListItems.length === 0 &&
        <View className="flex flex-col justify-center items-center py-[20px] px-[15px] w-[88vw] bg-alternative gap-y-[24px] rounded-[12px]">
          <EmptyState title="No Budget Found" />
        </View>
      }
      {ListItems.map((item) => <SavingsItem key={item.id} savings={item}/>)}
    </View>
  );
};
export default SavingsList;
