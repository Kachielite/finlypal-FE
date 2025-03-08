import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Text, TouchableOpacity, View } from 'react-native';

const AddExpenseModal = ({ modalizeRef }: { modalizeRef: any }) => {
  return (
    <Modalize ref={modalizeRef}
              modalHeight={400}
              modalStyle={{ backgroundColor: '#102632' }}
    >
      <View className="flex flex-row justify-between items-center w-full p-[24px]">
        <Text className="text-white font-urbanist-bold text-[24px]">Expense Filter</Text>
        <TouchableOpacity>
          <Text className="font-urbanist-bold text-secondary text-[16px]">Reset</Text>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};
export default AddExpenseModal;
