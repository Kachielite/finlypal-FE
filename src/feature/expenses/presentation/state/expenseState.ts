import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { create } from 'zustand';


type Category = {
  id: number,
  name: string,
  display_name: string,
  description: string
}

interface ExpenseState {
  isLoading: boolean,
  isModifyingExpense: boolean,
  showFilterModal: boolean,
  showCreateExpenseModal: boolean,
  expenseList: Expense[],
  categoryList: Category[],
  setIsLoading: (isLoading: boolean) => void,
  setIsModifyingExpense: (isModifyingExpense: boolean) => void,
  setShowFilterModal: (showFilterModal: boolean) => void,
  setShowCreateExpenseModal: (showCreateExpenseModal: boolean) => void,
  setExpenseList: (expenseList: Expense[]) => void,
  setCategoryList: (categoryList: Category[]) => void
}

export const useExpenseState = create<ExpenseState>((set) => ({
  isLoading: false,
  isModifyingExpense: false,
  showFilterModal: false,
  showCreateExpenseModal: false,
  expenseList: [],
  categoryList: [],
  setIsLoading: (isLoading: boolean) => set({isLoading}),
  setIsModifyingExpense: (isModifyingExpense: boolean) => set({isModifyingExpense}),
  setShowFilterModal: (showFilterModal: boolean) => set({showFilterModal}),
  setShowCreateExpenseModal: (showCreateExpenseModal: boolean) => set({showCreateExpenseModal}),
  setExpenseList: (expenseList: Expense[]) => set({expenseList}),
  setCategoryList: (categoryList: Category[]) => set({categoryList})
}))