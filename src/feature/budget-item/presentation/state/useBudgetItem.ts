import { useEffect } from 'react';
import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';
import { budgetItemBloc } from '@/src/feature/budget-item/presentation/state/budgetItemBloc';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';

const useBudgetItem = ({budget_item_id}: {budget_item_id: string}) => {
  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);

  useEffect(() => {
    if(budget_item_id){
      (
        async () => {
          await budgetItemBloc.handleBudgetItemEvent(BUDGET_ITEM_EVENTS.GET_BUDGET_ITEM_BY_ID, {budgetItemId: parseInt(budget_item_id)});
        }
      )()
    }
  },[budget_item_id])

  return {}
}

export default useBudgetItem;