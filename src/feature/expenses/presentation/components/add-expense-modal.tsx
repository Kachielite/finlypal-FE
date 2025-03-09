import React from 'react';
import { Modalize } from 'react-native-modalize';
import { Text, View } from 'react-native';
import Button from '@/src/shared/presentation/components/form/button';
import SelectInput from '@/src/shared/presentation/components/form/select-input';
import { ArrowDownUp, ChartColumnStacked } from 'lucide-react-native';
import DatePicker from '@/src/shared/presentation/components/form/date-picker';
import moment from 'moment';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import useExpense from '@/src/feature/expenses/presentation/state/useExpense';
import FieldInput from '@/src/shared/presentation/components/form/field-input';
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';

const expenseType = [
  {id: 1, label: "Expense", value: "EXPENSE" },
  {id: 2, label: "Income", value: "INCOME" },
]

type FilerExpenseModalProps = {
  modalizeRef: any,
}

const AddExpenseModal = ({ modalizeRef}: FilerExpenseModalProps) => {
  const {setValueExpense: setValue, watchExpense: watch, handleSubmitExpense: handleSubmit, errorsExpense: errors, resetExpenseForm} = useExpense();
  const isModifyingExpense = useExpenseState((state) => state.isModifyingExpense);
  const modalType = useExpenseState((state) => state.modalType);
  const categoryList = useExpenseState((state) => state.categoryList);
  const formattedCategories = categoryList.map((item) => ({ id: item.id, label: item.displayName, value: item.displayName }));
  const selectedExpense = useExpenseState((state) => state.selectedExpense);



  const createExpenseHandler = async () => {
    try {
      await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.CREATE_EXPENSE, {
        description: watch("description"),
        amount: watch("amount"),
        date: watch("date"),
        categoryId: watch("category")?.id,
        type: watch("type")?.value
      });

      resetExpenseForm();
      modalizeRef?.current?.close();

    } catch (error) {
      console.log("Error creating expense: ", error);
    }
  }

  const editExpenseHandler = async () => {
    const data = {
      id: selectedExpense?.id,
      amount: watch("amount"),
      date: watch("date"),
      description: watch("description"),
      type: watch("type")?.value,
      categoryId: watch("category")?.id
    }
    try {
      await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.UPDATE_EXPENSE, data);
      resetExpenseForm();
      modalizeRef?.current?.close();
    } catch (error) {
      console.log("Error updating expense: ", error);
    }
  }

  return (
    <Modalize
      onClosed={resetExpenseForm}
      onClose={resetExpenseForm}
      ref={modalizeRef}
      adjustToContentHeight
      keyboardAvoidingBehavior="height"
      modalStyle={{ backgroundColor: '#102632', borderTopRightRadius: 32, borderTopLeftRadius: 32, borderWidth: 1, borderColor: '#35383F' }}
    >
      <View className="flex flex-col justify-between items-center w-full px-[24px] pt-[24px] pb-[100px] h-full gap-y-[18px]">
        <Text className="text-white font-urbanist-bold text-center text-[24px] pb-[24px] border-b-[1px] border-b-[#35383F] w-full">
          {modalType === 'edit' ? 'Edit Expense' : 'Add Expense'}
        </Text>
        <FieldInput
          label="Description"
          placeholder="Enter expense description"
          value={watch("description") || ""}
          onChangeText={(value) => setValue("description", value, { shouldValidate: true })}
          error={errors?.description?.message}
        />
        <FieldInput
          type="numeric"
          label="Amount"
          placeholder="Enter expense amount"
          value={watch("amount")?.toString() || ""} // Ensure it's a string
          onChangeText={(value) => {
            const numericValue = parseFloat(value) || 0; // Ensure parsing doesn't break
            setValue("amount", numericValue, { shouldValidate: true });
          }}
          error={errors?.amount?.message}
        />
        <SelectInput
          data={expenseType}
          label="Type"
          placeholder="Select expense type"
          value={ watch("type") || null}
          onChangeText={(value) => setValue("type", value, { shouldValidate: true })}
          icon={<ArrowDownUp color="#9E9E9E" size={24}/>}
          error={errors?.type?.message}
        />
        <SelectInput
          data={formattedCategories}
          label="Category"
          placeholder="Select category"
          value={ watch('category') || null}
          onChangeText={(value) => setValue("category", value, { shouldValidate: true })}
          icon={<ChartColumnStacked color="#9E9E9E" size={24}/>}
          error={errors?.category?.message}
        />
        <DatePicker
          label="Date"
          placeholder="Select expense date"
          value={ watch("date")}
          onChange={(value) => setValue("date", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={errors?.startDate?.message}
        />
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px] mt-3">
          <View className="w-[30vw]">
            <Button type="secondary" onPress={() => modalizeRef?.current?.close()} label="Cancel" />
          </View>
          <View className="w-[55vw]">
            <Button onPress={modalType === 'edit' ? handleSubmit(editExpenseHandler) : handleSubmit(createExpenseHandler)} label={modalType === 'edit' ? 'Update' : 'Add'} isLoading={isModifyingExpense} />
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default AddExpenseModal;
