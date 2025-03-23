import React, { useEffect } from 'react';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { budgetSchema } from '@/src/core/validation/budget-validation';
import moment from 'moment';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';

export interface UseBudgetProps {
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  watch: (any: string) => any;
  errors: Record<string, any>;
  resetAddBudgetForm: () => void;
}


const useBudget = ({budgetId} : {budgetId?: number}): UseBudgetProps => {
  const selectedBudget: Budget | null = useBudgetState((state) => state.selectedBudget);
  const modalType = useBudgetState((state) => state.modalType);
  const {setValue, handleSubmit, watch, formState: { errors, defaultValues }, reset} = useForm({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      budgetName: '',
      icon: '💳',
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD'),
      totalBudget: 0
    }
  })

  const resetAddBudgetForm = () => {
    reset({
      budgetName: '',
      icon: '💳',
      startDate: moment().startOf('month').format('YYYY-MM-DD'),
      endDate: moment().endOf('month').format('YYYY-MM-DD'),
      totalBudget: 0
    })
  }

  useEffect(() => {
    if(!budgetId){
      (
        async () => {
          await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});
        }
      )()
    }
  }, []);

  useEffect(() => {
    if (budgetId) {
      (
        async () => {
          await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGET_BY_ID, {budgetId: budgetId});
        }
      )()
    }
  }, [budgetId]);
  

  useEffect(() => {
    if(selectedBudget && modalType === 'edit'){
      reset({
        budgetName: selectedBudget?.name,
        icon: selectedBudget?.icon,
        startDate: moment(selectedBudget?.startDate).format('YYYY-MM-DD'),
        endDate: moment(selectedBudget?.endDate).format('YYYY-MM-DD'),
        totalBudget: selectedBudget?.totalBudget
      })
    } else {
      resetAddBudgetForm()
    }

  }, [modalType, selectedBudget]);


  return { setValue, handleSubmit, watch, errors, resetAddBudgetForm};
};

export default useBudget;