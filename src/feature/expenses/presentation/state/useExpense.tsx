import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import { useEffect } from 'react';
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExpenseSchema } from '@/src/core/validation/expense-validation';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { Category } from '@/src/feature/category/domain/entity/category';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import { debounce } from 'lodash';

export type ExpenseHookType = {
  isLoading: boolean;
  isResettingForm: boolean;
  expenseList: Expense[];
  categoryList: Category[];
  watch: () => any;
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  fetchExpensesWithFilterData: () => void,
  resetExpenseList: () => void,
  errors: Record<string, any>;
  isLoadingMore: boolean;
  fetchMoreExpense: () => void;
}

const useExpense = (modalizeRef: any): ExpenseHookType => {
  const today = moment();
  const isLoading = useExpenseState((state) => state.isLoading);
  const isResettingForm = useExpenseState((state) => state.isResettingForm);
  const expenseList = useExpenseState((state) => state.expenseList);
  const categoryList = useExpenseState((state) => state.categoryList);
  const page = useExpenseState((state) => state.page);
  const hasMore = useExpenseState((state) => state.hasMore);
  const isLoadingMore = useExpenseState((state) => state.isLoadingMore);

  const {setValue, handleSubmit, watch, formState: { errors }, reset} = useForm({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      type: null,
      category: null,
      startDate: today.startOf('month').format('YYYY-MM-DD'),
      endDate: today.endOf('month').format('YYYY-MM-DD')
    }
  });

  const resetExpenseList = async () => {
    useExpenseState.getState().setIsResettingForm(true)
    try{
      reset()
      await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.GET_EXPENSES, {startDate: today.startOf('month').format('YYYY-MM-DD'), endDate: today.endOf('month').format('YYYY-MM-DD')})
      modalizeRef?.current?.close()
      showToast('success', 'Success', "Expense list reset successfully")
    } catch (error){
      console.log("Error resetting expense list: ", error)
      showToast('error', 'Error', "Error resetting expense list")
    } finally {
      useExpenseState.getState().setIsResettingForm(false)
    }
  }

  const fetchExpensesWithFilterData = async () => {
    const queryParams: { [key: string]: any } = {
      startDate: watch("startDate"),
      endDate: watch("endDate"),
    };

    const categoryID = categoryList.find(c => c.displayName === watch("category"))?.id;
    if (categoryID) {
      queryParams.categoryID = categoryID;
    }

    const type = watch("type") as 'INCOME' | 'EXPENSE' | null;
    if (type) {
      queryParams.type = type;
    }

    useExpenseState.getState().setIsLoading(true)
    try{
      await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.GET_EXPENSES, queryParams )
      modalizeRef?.current?.close()
      showToast('success', 'Success', "Expense list fetched successfully")
    } catch (error){
      console.log("Error fetching expense list: ", error)
      showToast('error', 'Error', "Error fetching expense list")
    } finally {
      useExpenseState.getState().setIsLoading(false)
    }
  }

  const fetchMoreExpense = async () => {
    const queryParams: { [key: string]: any } = {
      startDate: watch("startDate"),
      endDate: watch("endDate"),
      page
    };

    const categoryID = categoryList.find(c => c.displayName === watch("category"))?.id;
    if (categoryID) {
      queryParams.categoryID = categoryID;
    }

    const type = watch("type") as 'INCOME' | 'EXPENSE' | null;
    if (type) {
      queryParams.type = type;
    }

    if (hasMore) {
      useExpenseState.getState().setIsLoadingMore(true);

      try {
        // Define a debounced function and call it
        const debouncedFetch = debounce(async () => {
          await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.GET_MORE_EXPENSES, queryParams);
        }, 500);

        debouncedFetch(); // Call the debounced function

      } catch (error) {
        console.error("Error fetching more expense: ", error);
      } finally {
        useExpenseState.getState().setIsLoadingMore(false);
      }
    }
  };



  useEffect(() => {
    (async () => {
      useExpenseState.getState().setIsLoading(true)
      try{
        await Promise.all([
          expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.GET_EXPENSES, {startDate: watch("startDate"), endDate: watch("endDate")}),
          expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.GET_CATEGORIES, {page: null, pageSize: null})
        ])
      } catch (error){
        console.log("Error fetching data: ", error)
      } finally {
        useExpenseState.getState().setIsLoading(false)
      }
    })()
  }, []);
  

  return {
    isLoading,
    isResettingForm,
    expenseList,
    categoryList,
    watch,
    setValue,
    handleSubmit,
    errors,
    resetExpenseList,
    fetchExpensesWithFilterData,
    isLoadingMore,
    fetchMoreExpense
  }
}

export default useExpense;