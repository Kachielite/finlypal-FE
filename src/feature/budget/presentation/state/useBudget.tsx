import { useEffect } from 'react';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';

const useBudget = () => {

  useEffect(() => {
    (
      async () => {
        await budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {});
      }
    )()
  }, []);

  return { };
};

export default useBudget;