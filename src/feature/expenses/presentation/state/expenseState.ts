import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { create } from 'zustand';
import { Category } from '@/src/feature/category/domain/entity/category';

interface ExpenseState {
  isLoading: boolean,
  isModifyingExpense: boolean,
  isResettingForm: boolean
  showFilterModal: boolean,
  showCreateExpenseModal: boolean,
  expenseList: Expense[],
  categoryList: Category[],
  setIsLoading: (isLoading: boolean) => void,
  setIsModifyingExpense: (isModifyingExpense: boolean) => void,
  setIsResettingForm: (isResettingForm: boolean) => void,
  setShowFilterModal: (showFilterModal: boolean) => void,
  setShowCreateExpenseModal: (showCreateExpenseModal: boolean) => void,
  setExpenseList: (expenseList: Expense[]) => void,
  setCategoryList: (categoryList: Category[]) => void
}

export const useExpenseState = create<ExpenseState>((set) => ({
  isLoading: false,
  isModifyingExpense: false,
  isResettingForm: false,
  showFilterModal: false,
  showCreateExpenseModal: false,
  expenseList: [],
  categoryList: [],
  setIsLoading: (isLoading: boolean) => set({isLoading}),
  setIsModifyingExpense: (isModifyingExpense: boolean) => set({isModifyingExpense}),
  setIsResettingForm: (isResettingForm: boolean) => set({isResettingForm}),
  setShowFilterModal: (showFilterModal: boolean) => set({showFilterModal}),
  setShowCreateExpenseModal: (showCreateExpenseModal: boolean) => set({showCreateExpenseModal}),
  setExpenseList: (expenseList: Expense[]) => set({expenseList}),
  setCategoryList: (categoryList: Category[]) => set({categoryList})
}))