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
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowDownUp, ArrowLeft, ChartColumnStacked } from 'lucide-react-native';
import FieldInput from '@/src/shared/presentation/components/form/field-input';
import SelectInput from '@/src/shared/presentation/components/form/select-input';
import DatePicker from '@/src/shared/presentation/components/form/date-picker';
import moment from 'moment/moment';
import CheckBox from '@/src/shared/presentation/components/form/checkbox';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { useSavingState } from '@/src/feature/savings/presentation/state/savingsState';

const AddExpenseScreen = () => {
  const { typeOfExpense } = useLocalSearchParams<{ typeOfExpense: string }>();
  const {setValueExpense: setValue, watchExpense: watch, handleSubmitExpense: handleSubmit, errorsExpense: errors, resetExpenseForm} = useExpense(typeOfExpense);
  const isModifyingExpense = useExpenseState((state) => state.isModifyingExpense);
  const modalType = useExpenseState((state) => state.modalType);
  const categoryList = useExpenseState((state) => state.categoryList);
  const formattedCategories = categoryList.map((item) => ({ id: item.id, label: item.displayName, value: item.displayName }));
  const budgetList = useBudgetState((state) => state.budgetList);
  const budgetItemList = useBudgetItemState((state) => state.budgetItemList);
  const savingsList = useSavingState((state) => state.savingList);
  const selectedExpense = useExpenseState((state) => state.selectedExpense);

  const formattedBudgets = budgetList.map((item) => ({ id: item.id, label: item.name, value: item.name }));
  const formattedBudgetItems = budgetItemList.map((item) => ({ id: item.id, label: item.name, value: item.name }));
  const formattedSavings = savingsList.map((item) => ({ id: item.id, label: item.goalName, value: item.goalName }));



  const createExpenseHandler = async () => {
    await handleSubmit(async (data) => {
      try {
        await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.CREATE_EXPENSE, {
          description: data.description,
          amount: data.amount,
          date: data.date,
          categoryId: data.category?.id,
          type: data.type?.value,
          budgetItemId: data.budgetItem?.id || null,
          savingsID: data.savings?.id || null,
        });

        resetExpenseForm();
        router.replace("/(tabs)/expense")
      } catch (error) {
        console.log("Error creating expense: ", error);
      }
    })()
  }

  const editExpenseHandler = async () => {
    await handleSubmit(async (data) => {
      try {
        await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.UPDATE_EXPENSE, {
          id: selectedExpense?.id,
          description: data.description,
          amount: data.amount,
          date: data.date,
          categoryId: data.category?.id,
          type: data.type?.value,
          budgetItemId: data.budgetItem?.id || null,
          savingsID: data.savings?.id || null,
        });

        resetExpenseForm();
        router.replace("/(tabs)/expense")
      } catch (error) {
        console.log("Error updating expense: ", error);
      }
    })()
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
                    { modalType === 'edit'  ? 'Edit Expense' : typeOfExpense === 'expense' ? 'Add Expense' : 'Add Income' }
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
                  <View className="flex flex-row justify-start items-start w-full gap-x-[12px] mt-7">
                    <CheckBox
                      onChange={() => setValue("isRelatedToBudgetOrSavings", !watch("isRelatedToBudgetOrSavings"))}
                      isChecked={watch("isRelatedToBudgetOrSavings")}
                    />
                    <View className="flex flex-row justify-start items-center">
                      <Text className="text-white font-urbanist-regular text-[16px]">{typeOfExpense === 'expense' ? 'Is this expense related to budget plan?' : 'Is this income related to a savings goal?'}</Text>
                    </View>
                  </View>
                  {watch("isRelatedToBudgetOrSavings") && watch("type")?.value === "EXPENSE" && <>
                    <View className="flex flex-col justify-start items-start w-full gap-y-[7px]">
                      <SelectInput
                        data={formattedBudgets}
                        label="Select expense's budget"
                        placeholder="Select budget"
                        value={ watch('budget') || null}
                        onChangeText={(value) => setValue("budget", value, { shouldValidate: true })}
                        icon={<ChartColumnStacked color="#9E9E9E" size={24}/>}
                        error={errors?.budget?.message}
                      />
                      {formattedBudgets.length === 0 && watch("type")?.value === "EXPENSE" && <Text className="font-urbanist-regular text-sm text-red-500">
                        No budget found. Please create a budget from the planning screen.
                      </Text>}
                      {formattedBudgetItems.length === 0 && watch("budget") && <Text className="font-urbanist-regular text-sm text-red-500">
                        No budget items found for the selected budget. Please create a budget item for this budget from the planning screen.
                      </Text>}
                    </View>
                    {formattedBudgetItems.length > 0 && <SelectInput
                      data={formattedBudgetItems}
                      enabled={formattedBudgetItems.length > 0}
                      label="Select expense's budget category"
                      placeholder="Select budget category"
                      value={ watch('budgetItem') || null}
                      onChangeText={(value) => setValue("budgetItem", value, { shouldValidate: true })}
                      icon={<ChartColumnStacked color="#9E9E9E" size={24}/>}
                      error={errors?.budgetItem?.message}
                    />}
                  </>}
                  {watch("isRelatedToBudgetOrSavings") && watch("type")?.value === "INCOME" &&
                    <View className="flex flex-col justify-start items-start w-full gap-y-[7px]">
                      <SelectInput
                        data={formattedSavings}
                        label="Savings goal"
                        placeholder="Select savings goal"
                        value={ watch('savings') || null}
                        onChangeText={(value) => setValue("savings", value, { shouldValidate: true })}
                        icon={<ChartColumnStacked color="#9E9E9E" size={24}/>}
                        error={errors?.savings?.message}
                      />
                      {formattedSavings.length === 0 && watch("type")?.value === "INCOME" && <Text className="font-urbanist-regular text-sm text-red-500">
                        No savings goal found. Please create a savings goal from the planning screen.
                      </Text>}
                    </View>
                  }
                </View>
              </View>
              <View className="w-screen p-[24px] border-t-[1px] border-t-quaternary">
                <Button onPress={modalType === 'edit' ? editExpenseHandler : createExpenseHandler} label={modalType === 'edit' ? 'Update' : 'Add'} isLoading={isModifyingExpense} />
              </View>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default AddExpenseScreen;
