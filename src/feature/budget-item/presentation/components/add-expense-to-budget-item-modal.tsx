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
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';
import useBudgetItem from '@/src/feature/budget-item/presentation/state/useBudgetItem';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { budgetItemBloc } from '@/src/feature/budget-item/presentation/state/budgetItemBloc';
import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';

type AddExpenseToBudgetItemModalProps = {
  modalizeRef: any,
}

const AddExpenseToBudgetItemModal = ({ modalizeRef}: AddExpenseToBudgetItemModalProps) => {
  const {setExpenseValue, handleSubmitExpense, watchExpense, errorsExpense, resetExpenseForm} = useBudgetItem({});
  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);
  const expenseModalType = useExpenseState((state) => state.modalType);
  const categoryList = useExpenseState((state) => state.categoryList);
  const isModifyingExpense = useExpenseState((state) => state.isModifyingExpense);
  const selectedExpense = useExpenseState((state) => state.selectedExpense);
  const selectedBudget = useBudgetState((state) => state.selectedBudget);
  const formattedCategories = categoryList.map((item) => ({ id: item.id, label: item.displayName, value: item.displayName }));




  const createExpenseHandler = async () => {
    try {
      await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.CREATE_EXPENSE, {
        description: watchExpense("description"),
        amount: watchExpense("amount"),
        date: watchExpense("date"),
        categoryId: watchExpense("category")?.id,
        type: 'EXPENSE',
        budgetItemId: selectedBudgetItem?.id
      });

      await budgetItemBloc.handleBudgetItemEvent(
        BUDGET_ITEM_EVENTS.GET_BUDGET_ITEM_BY_ID, {budgetItemId: selectedBudgetItem?.id}
      );

      await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGET_BY_ID, {budgetId: selectedBudget?.id});

      await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});

      resetExpenseForm();
      modalizeRef?.current?.close();

    } catch (error) {
      console.log("Error creating expense: ", error);
    }
  }

  const editExpenseHandler = async () => {
    const data = {
      id: selectedExpense?.id,
      description: watchExpense("description"),
      amount: watchExpense("amount"),
      date: watchExpense("date"),
      categoryId: watchExpense("category")?.id,
      type: 'EXPENSE',
    }
    try {
      await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.UPDATE_EXPENSE, data);
      await budgetItemBloc.handleBudgetItemEvent(
        BUDGET_ITEM_EVENTS.GET_BUDGET_ITEM_BY_ID, {budgetItemId: selectedBudgetItem?.id}
      );

      await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGET_BY_ID, {budgetId: selectedBudget?.id});

      await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});
      
      resetExpenseForm();
      modalizeRef?.current?.close();
    } catch (error) {
      console.log("Error updating expense: ", error);
    }
  }

  return (
    <Modalize
      ref={modalizeRef}
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
          value={watchExpense("description") || ""}
          onChangeText={(value) => setExpenseValue("description", value, { shouldValidate: true })}
          error={errorsExpense?.description?.message}
        />
        <FieldInput
          type="numeric"
          label="Amount"
          placeholder="Enter expense amount"
          value={watchExpense("amount")?.toString() || ""} // Ensure it's a string
          onChangeText={(value) => {
            const numericValue = parseFloat(value) || 0; // Ensure parsing doesn't break
            setExpenseValue("amount", numericValue, { shouldValidate: true });
          }}
          error={errorsExpense?.amount?.message}
        />
        <SelectInput
          data={formattedCategories}
          label="Subcategory"
          placeholder="Select category"
          value={ watchExpense('category') || null}
          onChangeText={(value) => setExpenseValue("category", value, { shouldValidate: true })}
          icon={<ChartColumnStacked color="#9E9E9E" size={24}/>}
          error={errorsExpense?.category?.message}
        />
        <DatePicker
          label="Date"
          placeholder="Select expense date"
          value={ watchExpense("date")}
          onChange={(value) => setExpenseValue("date", moment(value).format("YYYY-MM-DD"), { shouldValidate: true })}
          error={errorsExpense?.startDate?.message}
        />
        <View className="flex flex-row justify-between items-center w-full gap-x-[12px] mt-3">
          <View className="w-[30vw]">
            <Button type="secondary" onPress={() => modalizeRef?.current?.close()} label="Cancel" />
          </View>
          <View className="w-[55vw]">
            <Button onPress={expenseModalType === 'edit' ? handleSubmitExpense(editExpenseHandler) : handleSubmitExpense(createExpenseHandler)} label={expenseModalType === 'edit' ? 'Update' : 'Add'} isLoading={isModifyingExpense} />
          </View>
        </View>
      </View>
    </Modalize>
  );
};
export default AddExpenseToBudgetItemModal;
