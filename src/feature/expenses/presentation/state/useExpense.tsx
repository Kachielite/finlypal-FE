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
import { budgetBloc } from '@/src/feature/budget/presentation/state/budgetBloc';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';
import { budgetItemBloc } from '@/src/feature/budget-item/presentation/state/budgetItemBloc';
import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';
import { savingsBloc } from '@/src/feature/savings/presentation/state/savingsBloc';
import { SAVINGS_EVENTS } from '@/src/feature/savings/presentation/state/savingsEvents';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import { useSavingState } from '@/src/feature/savings/presentation/state/savingsState';

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
  resetFilterForm:() => void,
  setErrorExpense: any
}

const useExpense = (typeOfExpense?: string): ExpenseHookType => {
  const today = moment();
  const expenseList = useExpenseState((state) => state.expenseList);
  const categoryList = useExpenseState((state) => state.categoryList);
  const page = useExpenseState((state) => state.page);
  const hasMore = useExpenseState((state) => state.hasMore);
  const selectedExpense = useExpenseState((state) => state.selectedExpense);
  const setSelectedExpense = useExpenseState((state) => state.setSelectedExpense);
  const modalType = useExpenseState((state) => state.modalType);
  const selectedBudgetItem = useBudgetItemState((state) => state.selectedBudgetItem);
  const selectedBudget = useBudgetState((state) => state.selectedBudget);
  const selectedSaving = useSavingState((state) => state.selectedSaving);
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

  const {setValue: setValueExpense, handleSubmit: handleSubmitExpense, watch: watchExpense, setError: setErrorExpense , formState: { errors: errorsExpense }, reset: resetExpense} = useForm({
    resolver: zodResolver(CreateExpenseSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: defaultCategory,
      type: typeOfExpense === 'expense' ?  expenseType[0] : expenseType[1],
      date: moment().startOf("day").format("YYYY-MM-DD"),
      isRelatedToBudgetOrSavings: false,
      budget: null,
      budgetItem: null,
      savings: null
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
      isRelatedToBudgetOrSavings: false,
      budget: null,
      budgetItem: null,
      savings: null
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
    (
      async () => {
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
            isRelatedToBudgetOrSavings: !!(selectedExpense?.budgetItemId || selectedExpense?.savingsID),
            budget: selectedBudget ? {id: selectedBudget?.id, label: selectedBudget?.name, value: selectedBudget?.name} : null,
            budgetItem: selectedBudgetItem ? {id: selectedBudgetItem?.id, label: selectedBudgetItem?.name, value: selectedBudgetItem?.name} : null,
            savings: selectedSaving ? {id: selectedSaving?.id, label: selectedSaving?.goalName, value: selectedSaving?.goalName} : null
          });
        }
      }
    )()
  }, [selectedExpense, modalType, resetExpense, expenseType]);


  // Fetch Budgets or Savings if expense is related to budget or savings
  const fetchBudget = async () => budgetBloc.handleBudgetEvent(BUDGET_EVENTS.GET_BUDGETS, {page: 0, pageSize: 50});
  const fetchSavings = async () => savingsBloc.handleSavingsEvents(SAVINGS_EVENTS.GET_ALL_SAVINGS, {page: 0, pageSize: 50});
  useEffect(() => {
    (
      async () => {
        if(watchExpense('isRelatedToBudgetOrSavings') === true && watch('type')?.value === 'EXPENSE'){
          await fetchBudget();
        }

        if(watchExpense('isRelatedToBudgetOrSavings') === true && watch('type')?.value === 'INCOME'){
          await fetchSavings();
        }
      }
    )()
  }, [watchExpense('isRelatedToBudgetOrSavings'), watch('type')]);


  // Fetch budget items for selected budget
  const fetchBudgetItems = async (budgetId: number) => await budgetItemBloc.handleBudgetItemEvent(BUDGET_ITEM_EVENTS.GET_ALL_BUDGET_ITEMS, {page: 0, pageSize: 50, budgetId: budgetId});

  useEffect(() => {
    (
      async () => {
        if (watchExpense('budget') && watchExpense('budget')?.id) {
          await fetchBudgetItems(watchExpense('budget')?.id as number);
        }
      }
    )()
  }, [watchExpense('budget')]);


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
    resetFilterForm,
    setErrorExpense
  }
}

export default useExpense;