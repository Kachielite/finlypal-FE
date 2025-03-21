import React, { useEffect } from 'react';
import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';
import { budgetItemBloc } from '@/src/feature/budget-item/presentation/state/budgetItemBloc';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetItemExpenseSchema, budgetItemSchema } from '@/src/core/validation/budget-item-validation';
import moment from 'moment';

export interface UseBudgetItemReturnValues {
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  watch: (any: string) => any;
  errors: Record<string, any>;
  resetForm: () => void;
  setExpenseValue: any;
  handleSubmitExpense: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  watchExpense: (any: string) => any;
  errorsExpense: Record<string, any>;
  resetExpenseForm: () => void;
}

const useBudgetItem = (
  {budget_item_id}: {budget_item_id?: string}
): UseBudgetItemReturnValues => {

  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);
  const modalType = useBudgetItemState((state) => state.modalType);

  const {setValue, handleSubmit, watch, formState: { errors }, reset} = useForm({
    resolver: zodResolver(budgetItemSchema),
    defaultValues: {
      name: "",
      icon: "🛒",
      allocatedAmount: 0,
    },
  })

  const {setValue: setExpenseValue, handleSubmit: handleSubmitExpense, watch: watchExpense, formState: { errors: errorsExpense }, reset: resetExpense} = useForm({
    resolver: zodResolver(budgetItemExpenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: null,
      date: moment().format('YYYY-MM-DD'),
    },
  })

  const resetForm = () => {
    reset({
      name: "",
      icon: "🛒",
      allocatedAmount: 0,
    })
  }

  const resetExpenseForm = () =>{
    resetExpense({
      description: "",
      amount: 0,
      category: null,
      date: moment().format('YYYY-MM-DD'),
    })
  }

  useEffect(() => {
    if(budget_item_id){
      (
        async () => {
          await budgetItemBloc.handleBudgetItemEvent(
            BUDGET_ITEM_EVENTS.GET_BUDGET_ITEM_BY_ID, {budgetItemId: parseInt(budget_item_id)}
          );
        }
      )()
    }
  },[budget_item_id])



  useEffect(() => {
    if(selectedBudgetItem && modalType === 'edit'){
      reset({
        name: selectedBudgetItem.name,
        icon: selectedBudgetItem.icon,
        allocatedAmount: selectedBudgetItem.allocatedAmount
      })
    }
  }, [selectedBudgetItem, modalType]);

  return {setValue, handleSubmit, watch, errors, resetForm, setExpenseValue, handleSubmitExpense, watchExpense, errorsExpense, resetExpenseForm}
}

export default useBudgetItem;