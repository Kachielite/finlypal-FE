import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import { useEffect } from 'react';
import { expenseBloc } from '@/src/feature/expenses/presentation/state/expenseBloc';
import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';
import { useForm } from 'react-hook-form';
import moment from 'moment/moment';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateExpenseSchema, GetExpenseSchema } from '@/src/core/validation/expense-validation';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { Category } from '@/src/feature/category/domain/entity/category';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import { debounce } from 'lodash';

export type ExpenseHookType = {
  expenseList: Expense[];
  categoryList: Category[];
  watch: () => any;
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  fetchExpensesWithFilterData: () => void,
  resetExpenseList: () => void,
  errors: Record<string, any>;
  fetchMoreExpense: () => void;
  setValueExpense: any;
  handleSubmitExpense: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  watchExpense: (any: string) => any;
  errorsExpense: Record<string, any>;
  resetExpense: () => void,
  createExpense: () => void
}

const useExpense = (modalizeRef: any): ExpenseHookType => {
  const today = moment();
  const expenseList = useExpenseState((state) => state.expenseList);
  const categoryList = useExpenseState((state) => state.categoryList);
  const page = useExpenseState((state) => state.page);
  const hasMore = useExpenseState((state) => state.hasMore);

  const {setValue, handleSubmit, watch, formState: { errors }, reset} = useForm({
    resolver: zodResolver(GetExpenseSchema),
    defaultValues: {
      type: null,
      category: null,
      startDate: today.startOf('month').format('YYYY-MM-DD'),
      endDate: today.endOf('month').format('YYYY-MM-DD')
    }
  });

  const {setValue: setValueExpense, handleSubmit: handleSubmitExpense, watch: watchExpense, formState: { errors: errorsExpense }, reset: resetExpense} = useForm({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      description: '',
      amount: 0,
      category: null,
      type: null,
      date: today.format('YYYY-MM-DD')
    }
  })

  const createExpense = async () => {
    useExpenseState.getState().setIsModifyingExpense(true);

    const data = {
      description: watchExpense("description"),
      amount: watchExpense("amount"),
      date: watchExpense("date"),
      categoryID: categoryList.find(c => c.displayName === watchExpense("category"))?.id,
      type: watchExpense("type")
    }
    try{
      await expenseBloc.handleExpenseEvent(EXPENSE_EVENTS.CREATE_EXPENSE, data)
      modalizeRef?.current?.close()
      showToast('success', 'Success', "Expense created successfully")
    } catch (error){
      console.log("Error creating expense: ", error)
      showToast('error', 'Error', "Error creating expense")
    } finally {
      useExpenseState.getState().setIsModifyingExpense(false);
    }
  }

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
    expenseList,
    categoryList,
    watch,
    setValue,
    handleSubmit,
    errors,
    resetExpenseList,
    fetchExpensesWithFilterData,
    fetchMoreExpense,
    setValueExpense,
    watchExpense,
    errorsExpense,
    resetExpense,
    handleSubmitExpense,
    createExpense
  }
}

export default useExpense;