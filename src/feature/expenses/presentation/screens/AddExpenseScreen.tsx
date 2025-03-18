import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import Button from '@/src/shared/presentation/components/form/button';
import useExpense, { expenseType } from '@/src/feature/expenses/presentation/state/useExpense';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';
import { router } from 'expo-router';
import { ArrowDownUp, ArrowLeft, ChartColumnStacked } from 'lucide-react-native';
import FieldInput from '@/src/shared/presentation/components/form/field-input';
import SelectInput from '@/src/shared/presentation/components/form/select-input';
import DatePicker from '@/src/shared/presentation/components/form/date-picker';
import moment from 'moment/moment';

const AddExpenseScreen = () => {
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
      router.back();
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
      router.back();
    } catch (error) {
      console.log("Error updating expense: ", error);
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full w-screen">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <View className="flex flex-col justify-between items-center h-full w-full">
              <View className="w-full flex flex-col justify-start items-start px-[24px] pt-[16px]">
                <View className="flex flex-row justify-between items-center w-full">
                  <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft color="white" size={30} />
                  </TouchableOpacity>
                  <Text className="text-white font-urbanist-bold text-[24px]">
                    {modalType === 'edit' ? 'Edit Expense' : 'Add Expense'}
                  </Text>
                  <View/>
                </View>

                <View className="flex flex-col justify-start items-center w-full my-[24px] gap-y-[24px]">
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
                </View>
              </View>
              <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
                <Button onPress={modalType === 'edit' ? handleSubmit(editExpenseHandler) : handleSubmit(createExpenseHandler)} label={modalType === 'edit' ? 'Update' : 'Add'} isLoading={isModifyingExpense} />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default AddExpenseScreen;
