import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';
import SelectInput from '@/src/shared/presentation/components/form/select-input';
import { ArrowDownUp, ChartColumnStacked } from 'lucide-react-native';

const expenseType = [
  { label: "Expense", value: "EXPENSE" },
  { label: "Income", value: "INCOME" },
]

const FilterExpenseModal = ({ modalizeRef }: { modalizeRef: any }) => {
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
      <View className="flex flex-col justify-between items-center w-full px-[24px] pt-[24px] pb-[100px] h-full gap-y-[36px]">
        <Text className="text-white font-urbanist-bold text-center text-[24px] pb-[24px] border-b-[1px] border-b-[#35383F] w-full">
           Filter
        </Text>
        <SelectInput
          data={expenseType}
          label="Type"
          placeholder="Select expense type"
          value=""
          onChangeText={() => console.log("select expense type")}
          icon={<ArrowDownUp color="#9E9E9E" size={24}/>}
        />
        <SelectInput
          data={expenseType}
          label="Category"
          placeholder="Select expense category"
          value=""
          onChangeText={() => console.log("select expense type")}
          icon={<ChartColumnStacked color="#9E9E9E" size={24}/>}
        />
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px]">
          <View className="w-[30vw]">
            <Button type="secondary" onPress={() => console.log("reset")} label="Reset" />
          </View>
          <View className="w-[55vw]">
            <Button onPress={() => console.log("apply")} label="Apply" />
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default FilterExpenseModal;
