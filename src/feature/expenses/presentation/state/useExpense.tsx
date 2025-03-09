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
import { debounce } from 'lodash';

export const expenseType = [
  {id: 1, label: "Expense", value: "EXPENSE" },
  {id: 2, label: "Income", value: "INCOME" },
]

export type ExpenseHookType = {
  expenseList: Expense[];
  categoryList: Category[];
  watch: (any: string) => any;
  setValue: any;
  handleSubmit: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: Record<string, any>;
  fetchMoreExpense: () => void;
  setValueExpense: any;
  handleSubmitExpense: (callback: (data: any) => void) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  watchExpense: (any: string) => any;
  errorsExpense: Record<string, any>;
  resetExpenseForm: () => void,
  resetFilterForm:() => void
}

const useExpense = (): ExpenseHookType => {
  const today = moment();
  const expenseList = useExpenseState((state) => state.expenseList);
  const categoryList = useExpenseState((state) => state.categoryList);
  const page = useExpenseState((state) => state.page);
  const hasMore = useExpenseState((state) => state.hasMore);
  const selectedExpense = useExpenseState((state) => state.selectedExpense);
  const setSelectedExpense = useExpenseState((state) => state.setSelectedExpense);
  const modalType = useExpenseState((state) => state.modalType);
  const defaultCategory = categoryList.length > 0 ? {id: categoryList[0]?.id, label: categoryList[0]?.displayName, value: categoryList[0]?.displayName } : {"id": 251, "label": "Bonuses", "value": "Bonuses"}

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
      description: "",
      amount: 0,
      category: defaultCategory,
      type: expenseType[1],
      date: moment().startOf("day").format("YYYY-MM-DD"),
    }
  })


  const fetchMoreExpense = async () => {
    const queryParams: { [key: string]: any } = {
      startDate: watch("startDate"),
      endDate: watch("endDate"),
      categoryId: null,
      type: null,
      page
    };

    const categoryID = watch("category")?.id;
    if (categoryID) {
      queryParams.categoryID = categoryID;
    }

    const type = watch("type")?.value;
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

  const resetExpenseForm = () => {
    setSelectedExpense(null)
    resetExpense({
      description: "",
      amount: 0,
      category: defaultCategory,
      type: expenseType[1],
      date: today.format('YYYY-MM-DD'),
    });
  }

  const resetFilterForm = () => {
    reset({
      type: null,
      category: null,
      startDate: today.startOf('month').format('YYYY-MM-DD'),
      endDate: today.endOf('month').format('YYYY-MM-DD')
    })
  }

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


  useEffect(() => {
    if (modalType === "edit" && selectedExpense) {
      resetExpense({
        description: selectedExpense.description || "",
        amount: selectedExpense.amount || 0,
        category: selectedExpense
          ? {
            id: selectedExpense.categoryId,
            label: selectedExpense.categoryName,
            value: selectedExpense.categoryName,
          }
          : defaultCategory,
        type: expenseType.find((e) => e.value === selectedExpense?.type) || expenseType[1],
        date: selectedExpense?.date || today.format("YYYY-MM-DD"),
      });
    }
  }, [selectedExpense, modalType, resetExpense, expenseType]);

  

  return {
    expenseList,
    categoryList,
    watch,
    setValue,
    handleSubmit,
    errors,
    fetchMoreExpense,
    setValueExpense,
    watchExpense,
    errorsExpense,
    resetExpenseForm,
    handleSubmitExpense,
    resetFilterForm
  }
}

export default useExpense;