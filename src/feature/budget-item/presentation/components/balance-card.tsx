import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import images from '@/src/core/constants/images';
import { CirclePlus, EditIcon, TrashIcon } from 'lucide-react-native';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import barColor from '@/src/core/utils/barColor';
import { useAuthState } from '@/src/feature/authentication/presentation/state/authState';

type BudgetItemBalanceCardProps = {
  budgetItem: BudgetItem,
  openEditBudgetItemModal: () => void,
  openDeleteBudgetItemModal: () => void,
  openExpenseModal: () => void
}

const BalanceCard = (
  {budgetItem, openEditBudgetItemModal, openDeleteBudgetItemModal, openExpenseModal}:BudgetItemBalanceCardProps
) => {

  const currency = useAuthState((state) => state.user?.currency.symbol);
  const allocatedAmount = budgetItem?.allocatedAmount;
  const actualSpend = budgetItem?.actualSpend as number;
  const percentage = (actualSpend / allocatedAmount) * 100;

  return (
    <View className="flex w-full flex-col justify-start items-center p-3 gap-y-6 shadow-md rounded-[20px] bg-alternative">
      <ImageBackground
        source={images.budgetBackground}
        className="relative w-full h-[20vh] rounded-[20px] overflow-hidden"
        resizeMode="cover"
      >
        <View className="absolute w-full h-full flex flex-col justify-between p-[15px] items-start bg-black/[0.2] gap-y-[10px]">
          <Text className="text-white font-urbanist-bold text-3xl">{budgetItem?.name}</Text>
          <View className="flex flex-col justify-start items-start gap-y-[10px] w-full">
            <View className="flex flex-row justify-between items-center w-full">
              <Text className="text-white font-urbanist-medium text-[14px]">
                Balance
              </Text>
              <Text className="text-white font-urbanist-medium text-[14px]">
                {percentage.toFixed(2)}%
              </Text>
            </View>
            <View className="w-full rounded-2xl h-[8px] bg-[#102632]">
              <View style={{width: `${percentage <= 100 ? percentage : 100}%`, backgroundColor: barColor(percentage)}} className="rounded-2xl h-full"/>
            </View>
            <View className="flex flex-row justify-between items-center w-full">
              <View className="flex flex-row justify-start items-center gap-x-[5px]">
                <Text className="text-white font-urbanist-bold text-[16px]">
                  {currency}{actualSpend}
                </Text>
                <Text className="text-white font-urbanist-medium text-[12px]">
                  of {currency}{allocatedAmount}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View className="w-full flex flex-row justify-center items-center gap-x-[20px]">
        <TouchableOpacity onPress={openExpenseModal} className="flex flex-col justify-start items-center gap-y-[10px] w-[70px] ">
          <CirclePlus size={32} color="white" strokeWidth={1} />
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white font-urbanist-bold text-[10px]">Add</Text>
            <Text className="text-white font-urbanist-bold text-[10px]">Expense</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openEditBudgetItemModal} className="flex flex-col justify-start items-center gap-y-[10px] w-[100px] border-x-[1px] border-[#35383F]">
          <EditIcon size={32} color="white" strokeWidth={1} />
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white font-urbanist-bold text-[10px]">Edit</Text>
            <Text className="text-white font-urbanist-bold text-[10px]">Category</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDeleteBudgetItemModal} className="flex flex-col justify-start items-center gap-y-[10px] w-[70px] ">
          <TrashIcon size={32} color="white" strokeWidth={1} />
          <View className="flex flex-col justify-center items-center">
            <Text className="text-white font-urbanist-bold text-[10px]">Delete</Text>
            <Text className="text-white font-urbanist-bold text-[10px]">Category</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default BalanceCard;
