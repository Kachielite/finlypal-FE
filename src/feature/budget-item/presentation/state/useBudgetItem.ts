import React, { useEffect } from 'react';
import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';
import { budgetItemBloc } from '@/src/feature/budget-item/presentation/state/budgetItemBloc';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetItemSchema } from '@/src/core/validation/budget-item-validation';

export interface UseBudgetItemReturnValues {
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  watch: (any: string) => any;
  errors: Record<string, any>;
  resetForm: () => void;
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

  const resetForm = () => {
    reset({
      name: "",
      icon: "🛒",
      allocatedAmount: 0,
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

  return {setValue, handleSubmit, watch, errors, resetForm}
}

export default useBudgetItem;