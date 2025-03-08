import { Expense } from '@/src/feature/expenses/domain/entity/expense';

type FilterType = {
  startDate: string,
  endDate: string,
  categoryId?: number,
  type?: string
}

type NewExpense = {
  amount: number,
  date: string,
  description: string,
  type: string,
  categoryId: number
}

type Category = {
  id: number,
  name: string,
  display_name: string,
  description: string
}

interface ExpenseState {
  isLoading: boolean,
  expenseList: Expense[],
  filter: FilterType,
  newExpense: NewExpense,
  categoryList: Category[],
  setIsLoading: (isLoading: boolean) => void,
  setExpenseList: (expenseList: Expense[]) => void,
  setFilter: (filter: FilterType) => void,
  setNewExpense: (newExpense: NewExpense) => void,
  setCategoryList: (categoryList: Category[]) => void
}