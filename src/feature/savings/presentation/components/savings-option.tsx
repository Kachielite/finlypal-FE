import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Modalize } from 'react-native-modalize';
import { CirclePlus, EditIcon, TrashIcon } from 'lucide-react-native';
import { useSavingState } from '@/src/feature/savings/presentation/state/savingsState';

type SavingsOptionModalProps = {
  savingsOptionModal: React.RefObject<Modalize>;
  savingsModal: React.RefObject<Modalize>;
  deleteSavingsModal: React.RefObject<Modalize>;
  expenseModal: React.RefObject<Modalize>;
};

const SavingsOptionModal = ({savingsOptionModal, savingsModal, deleteSavingsModal, expenseModal }: SavingsOptionModalProps) => {
  const setModalType = useSavingState((state) => state.setModalType);

  const openSaveModal = () => {
    setModalType('edit');
    savingsOptionModal.current?.close();
    savingsModal.current?.open();
  };

  const openDeleteModal = () => {
    deleteSavingsModal.current?.open();
    savingsOptionModal.current?.close();
  };

  return (
    <Modalize
      ref={savingsOptionModal}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
      onOverlayPress={() => savingsOptionModal.current?.close()}
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
      <View
        className="flex flex-col justify-between items-center w-full px-[24px] py-[32px]  gap-y-[32px]"
      >
        <TouchableOpacity onPress={() => expenseModal.current?.open()} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-[#007BFF] rounded-[12px]">
          <CirclePlus size={24} color="white" />
          <Text className="text-white font-urbanist-bold text-[20px]">Add Expense</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openSaveModal} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-secondary rounded-[12px]">
          <EditIcon size={24} color="white" />
          <Text className="text-white font-urbanist-bold text-[20px]">Edit Savings Goal</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openDeleteModal} className="flex flex-row justify-center items-center gap-x-[20px] w-full p-[20px] bg-red-500 rounded-[12px]">
          <TrashIcon size={24} color="white" />
          <Text className="text-white font-urbanist-bold text-[20px]">Delete Savings Goal</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};
export default SavingsOptionModal;
