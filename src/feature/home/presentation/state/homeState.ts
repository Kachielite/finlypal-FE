import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { create } from 'zustand';

interface HomeState {
  isLoading: boolean,
  totalIncome: number,
  totalExpense: number,
  expensesList: Expense[],
  setIsLoading: (isLoading: boolean) => void;
  setTotalIncome: (totalIncome: number) => void;
  setTotalExpense: (totalExpense: number) => void;
  setExpenseList: (expenses: Expense[]) => void;
}


export const useHomeState = create<HomeState>((set) => ({
  isLoading: false,
  totalIncome: 0,
  totalExpense: 0,
  expensesList: [],
  setIsLoading: (isLoading: boolean) => set({isLoading}),
  setTotalIncome: (totalIncome) => set({totalIncome}),
  setTotalExpense: (totalExpense) => set({totalExpense}),
  setExpenseList: (expenses: Expense[]) => set({expensesList: expenses})
}));