import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Platform, Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';
import SelectInput from '@/src/shared/presentation/components/form/select-input';
import { ChartColumnStacked } from 'lucide-react-native';
import DatePicker from '@/src/shared/presentation/components/form/date-picker';
import moment from 'moment';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import FieldInput from '@/src/shared/presentation/components/form/field-input';


type AddExpenseToSavingsModalProps = {
  expenseModal: React.RefObject<Modalize>;
  createExpenseHandler: (expenseModel: React.RefObject<Modalize>) => void
  editExpenseHandler: (expenseModel: React.RefObject<Modalize>) => void,
  isModifyingExpense: boolean,
  expenseForm: any
}

const AddExpenseToSavingsModal = (
  { expenseModal, createExpenseHandler, editExpenseHandler, isModifyingExpense, expenseForm}: AddExpenseToSavingsModalProps
) => {

  const expenseModalType = useExpenseState((state) => state.modalType);
  const categoryList = useExpenseState((state) => state.categoryList);
  const formattedCategories = categoryList.map(
    (item) => ({ id: item.id, label: item.displayName, value: item.displayName })
  );

  return (
    <Modalize
      ref={expenseModal}
      adjustToContentHeight
      keyboardAvoidingBehavior={Platform.OS === "ios" ? "padding" : "height"}
      scrollViewProps={{ keyboardShouldPersistTaps: "handled" }}
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
      <View className="flex flex-col justify-between items-center w-full px-[24px] pt-[24px] pb-10 h-full gap-y-[18px]">
        <Text className="text-white font-urbanist-bold text-center text-[24px] pb-[24px] border-b-[1px] border-b-[#35383F] w-full">
          {expenseModalType === 'edit' ? 'Edit Expense' : 'Add Expense'}
        </Text>
        <FieldInput
          label="Description"
          placeholder="Enter expense description"
          value={expenseForm.watch("description") || ""}
          onChangeText={(value) => expenseForm.setValue("description", value, { shouldValidate: true })}
          error={expenseForm.formState.errors?.description?.message}
        />
        <FieldInput
          type="numeric"
          label="Amount"
          placeholder="Enter expense amount"
          value={expenseForm.watch("amount")?.toString() || ""} // Ensure it's a string
          onChangeText={(value) => {
            const numericValue = parseFloat(value) || 0; // Ensure parsing doesn't break
            expenseForm.setValue("amount", numericValue, { shouldValidate: true });
          }}
          error={expenseForm.formState.errors?.amount?.message}
        />
        <SelectInput
          data={formattedCategories}
          label="Category"
          placeholder="Select category"
          value={ expenseForm.watch('category')}
          onChangeText={(value) => expenseForm.setValue("category", value, { shouldValidate: true })}
          icon={<ChartColumnStacked color="#9E9E9E" size={24}/>}
          error={expenseForm.formState.errors?.category?.message}
        />
        <DatePicker
          label="Date"
          placeholder="Select expense date"
          value={ expenseForm.watch("date") as any}
          onChange={(value) => expenseForm.setValue("date", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={expenseForm.formState.errors?.startDate?.message}
        />
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px] mt-3">
          <View className="w-[30vw]">
            <Button type="secondary" onPress={() => expenseModal?.current?.close()} label="Cancel" />
          </View>
          <View className="w-[55vw]">
            <Button
              onPress={() => expenseModalType === 'edit' ? editExpenseHandler(expenseModal) : createExpenseHandler(expenseModal)}
              label={expenseModalType === 'edit' ? 'Update' : 'Add'}
              isLoading={isModifyingExpense}
            />
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default AddExpenseToSavingsModal;
