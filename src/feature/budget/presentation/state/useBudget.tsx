import { useEffect } from 'react';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';

const useBudget = ({budgetId} : {budgetId?: number}) => {
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



  return { };
};

export default useBudget;