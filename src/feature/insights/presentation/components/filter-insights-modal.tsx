import { Text, View } from 'react-native';
import React from 'react';
import { Modalize } from 'react-native-modalize';
import SelectInput from '@/src/shared/presentation/components/form/select-input';
import { expenseType } from '@/src/feature/expenses/presentation/state/useExpense';
import { ArrowDownUp } from 'lucide-react-native';
import DatePicker from '@/src/shared/presentation/components/form/date-picker';
import moment from 'moment/moment';
import Button from '@/src/shared/presentation/components/form/button';
import useInsights from '@/src/feature/insights/presentation/state/useInsights';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';

const FilterInsightsModal = ({modalizeRef}:{modalizeRef: any}) => {
  const isLoading = useInsightsState((state) => state.isLoading);
  const {watch, setValue, handleSubmit, errors, resetInsightsFilterForm, fetchInsightsWithFilterData} = useInsights(modalizeRef);

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
            <Button type="secondary" onPress={resetInsightsFilterForm} label="Reset" />
          </View>
          <View className="w-[55vw]">
            <Button onPress={handleSubmit(fetchInsightsWithFilterData)} label="Apply" isLoading={isLoading} />
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default FilterInsightsModal;
