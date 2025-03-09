import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';
import SelectInput from '@/src/shared/presentation/components/form/select-input';
import { ArrowDownUp, ChartColumnStacked } from 'lucide-react-native';
import DatePicker from '@/src/shared/presentation/components/form/date-picker';
import { Category } from '@/src/feature/category/domain/entity/category';
import moment from 'moment';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import useExpense, { expenseType } from '@/src/feature/expenses/presentation/state/useExpense';


type FilerExpenseModalProps = {
  modalizeRef: any,
  categoryList: Category[]
  watch: (type: any) => any;
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<string, any>;
}

const FilterExpenseModal = ({ modalizeRef, categoryList, watch, setValue, handleSubmit, errors}: FilerExpenseModalProps) => {
  const isLoading = useExpenseState((state) => state.isLoading);
  const isResettingForm = useExpenseState((state) => state.isResettingForm);
  const {resetExpenseList, fetchExpensesWithFilterData} = useExpense(modalizeRef);

  const formattedCategories = categoryList.map((item) => ({ id: item.id, label: item.displayName, value: item.displayName }))
  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      keyboardAvoidingBehavior="padding"
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
      <View className="flex flex-col justify-between items-center w-full px-[24px] pt-[24px] pb-[100px] h-full gap-y-[18px]">
        <Text className="text-white font-urbanist-bold text-center text-[24px] pb-[24px] border-b-[1px] border-b-[#35383F] w-full">
           Filter
        </Text>
        <SelectInput
          data={expenseType}
          label="Type"
          placeholder="Select expense type"
          value={watch("type")}
          onChangeText={(value) => setValue("type", value, { shouldValidate: true })}
          icon={<ArrowDownUp color="#9E9E9E" size={24}/>}
          error={errors?.type?.message}
        />
        <SelectInput
          data={formattedCategories}
          label="Category"
          placeholder="Select category"
          value={watch('category')}
          onChangeText={(value) => setValue("category", value, { shouldValidate: true })}
          icon={<ChartColumnStacked color="#9E9E9E" size={24}/>}
          error={errors?.category?.message}
        />
        <DatePicker
          label="Start Date"
          placeholder="Select start date"
          value={watch("startDate")}
          onChange={(value) => setValue("startDate", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={errors?.startDate?.message}
        />
        <DatePicker
          label="End Date"
          placeholder="Select start date"
          value={watch("endDate")}
          onChange={(value) => setValue("endDate", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={errors?.endDate?.message}
        />
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px]">
          <View className="w-[30vw]">
            <Button type="secondary" onPress={resetExpenseList} label="Reset" isLoading={isResettingForm} />
          </View>
          <View className="w-[55vw]">
            <Button onPress={handleSubmit(fetchExpensesWithFilterData)} label="Apply" isLoading={isLoading} />
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default FilterExpenseModal;
