import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Modalize } from 'react-native-modalize';
import { CircleCheckBig, CirclePlus, EditIcon, TrashIcon } from 'lucide-react-native';
import { BudgetStatus } from '@/src/feature/budget/domain/entity/budget';
import getBudgetStatus from '@/src/core/utils/getBudgetStatus';

type BudgetDetailsOptionProps = {
  modalizeRef: React.RefObject<Modalize>;
  openCreateModal: () => void;
  openDeleteModal: () => void;
  openAddBudgetItemModal: () => void;
  openMarkAsCompletedModal: () => void;
  budgetStatus?: string;
}



const BudgetDetailsOption = ({modalizeRef,openCreateModal, openDeleteModal, openAddBudgetItemModal, openMarkAsCompletedModal, budgetStatus }: BudgetDetailsOptionProps) => {
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
      onOverlayPress={() => modalizeRef.current?.close()}
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
      <View className="flex flex-col justify-between items-center w-full px-[24px] py-[32px] gap-y-[20px]">
        {getBudgetStatus(budgetStatus as string) !== BudgetStatus.COMPLETED && (
          <>
            <TouchableOpacity onPress={openAddBudgetItemModal} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-[#007BFF] rounded-[12px]">
              <CirclePlus size={24} color="white" />
              <Text className="text-white font-urbanist-bold text-[20px]">Add Budget Category</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openCreateModal} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-[#EAB308] rounded-[12px]">
              <EditIcon size={24} color="white" />
              <Text className="text-white font-urbanist-bold text-[20px]">Edit Budget</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={openMarkAsCompletedModal} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-secondary rounded-[12px]">
              <CircleCheckBig size={24} color="white" />
              <Text className="text-white font-urbanist-bold text-[20px]">Mark as Completed</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={openDeleteModal} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-red-500 rounded-[12px]">
          <TrashIcon size={24} color="white" />
          <Text className="text-white font-urbanist-bold text-[20px]">Delete Budget</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};
export default BudgetDetailsOption;
