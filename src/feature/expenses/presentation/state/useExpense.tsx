import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import { useEffect } from 'react';
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExpenseSchema } from '@/src/core/validation/expense-validation';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export type ExpenseHookType = {
  isLoading: boolean;
  expenseList: Expense[];
  watch: () => any;
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<string, any>;
}

const useExpense = (): ExpenseHookType => {
  const today = moment();
  const isLoading = useExpenseState((state) => state.isLoading);
  const expenseList = useExpenseState((state) => state.expenseList);

  const {setValue, handleSubmit, watch, formState: { errors }} = useForm({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      type: null,
      categoryID: null,
      startDate: today.startOf('month').format('YYYY-MM-DD'),
      endDate: today.endOf('month').format('YYYY-MM-DD')
    }
  });


  useEffect(() => {
    (async () => {
      useExpenseState.getState().setIsLoading(true)
      try{
          await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.GET_EXPENSES, {startDate: watch("startDate"), endDate: watch("endDate")})
      } catch (error){
        console.log("Error fetching data: ", error)
      } finally {
        useExpenseState.getState().setIsLoading(false)
      }
    })()
  }, [watch("endDate"), watch("startDate")]);

  return {isLoading, expenseList, watch, setValue, handleSubmit, errors}
}

export default useExpense;