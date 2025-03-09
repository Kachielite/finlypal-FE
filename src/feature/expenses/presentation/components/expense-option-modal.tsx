import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Text, TouchableOpacity, View } from 'react-native';
import { EditIcon, TrashIcon } from 'lucide-react-native';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';

type ExpenseOptionModal = {
  modalizeRef: any,
  createModalRef: any
  deleteModalRef: any
}

const ExpenseOptionModal = (
  { modalizeRef, createModalRef, deleteModalRef}: ExpenseOptionModal
) => {
  const setModalType = useExpenseState((state) => state.setModalType);

  const openCreateModal = () => {
    setModalType('edit')
    modalizeRef.current?.close();
    createModalRef.current?.open();
  };

  const openDeleteModal = () => {
    modalizeRef.current?.close();
    deleteModalRef.current?.open();
  };

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
      onOverlayPress={() => modalizeRef.current?.close()}
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
      <View className="flex flex-col justify-between items-center w-full px-[24px] pt-[32px] pb-[100px] h-full gap-y-[32px]">
        <TouchableOpacity onPress={openCreateModal} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-blue-500 rounded-[12px]">
          <EditIcon size={24} color="white" />
          <Text className="text-white font-urbanist-semibold text-[20px]">Edit Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDeleteModal} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-red-500 rounded-[12px]">
          <TrashIcon size={24} color="white" />
          <Text className="text-white font-urbanist-semibold text-[20px]">Delete Expense</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};
export default ExpenseOptionModal;
