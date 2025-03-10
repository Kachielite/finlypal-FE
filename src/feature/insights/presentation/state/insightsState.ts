import { MonthlySpend } from '@/src/feature/insights/domain/entity/MonthlySpend';
import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';
import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';
import { create } from 'zustand';
import { DailySpend } from '@/src/feature/insights/domain/entity/DailySpend';

export interface InsightsState {
  isLoading: boolean;
  totalIncome: number;
  totalExpense: number;
  monthlySpendingIncome: MonthlySpend[];
  monthlySpendingExpense: MonthlySpend[];
  totalExpenseSpendByCategory: TotalSpendByCategory[];
  totalIncomeSpendByCategory: TotalSpendByCategory[];
  topExpenses: TopExpenses[];
  dailySpend: DailySpend[];
  setIsLoading: (isLoading: boolean) => void;
  setTotalIncome: (totalIncome: number) => void;
  setTotalExpense: (totalExpense: number) => void;
  setMonthlySpendingIncome: (monthlySpending: MonthlySpend[]) => void;
  setMonthlySpendingExpense: (monthlySpending: MonthlySpend[]) => void;
  setTotalExpenseSpendByCategory: (totalExpenseSpendByCategory: TotalSpendByCategory[]) => void;
  setTotalIncomeSpendByCategory: (totalIncomeSpendByCategory: TotalSpendByCategory[]) => void;
  setTopExpenses: (topExpenses: TopExpenses[]) => void;
  setDailySpend: (dailySpend: DailySpend[]) => void;
}


export const useInsightsState = create<InsightsState>((set) => ({
  isLoading: false,
  totalIncome: 0,
  totalExpense: 0,
  monthlySpendingIncome: [],
  monthlySpendingExpense: [],
  totalIncomeSpendByCategory: [],
  totalExpenseSpendByCategory: [],
  topExpenses: [],
  dailySpend: [],
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setTotalIncome: (totalIncome: number) => set({ totalIncome }),
  setTotalExpense: (totalExpense: number) => set({ totalExpense }),
  setMonthlySpendingIncome: (monthlySpendingIncome: MonthlySpend[]) => set({ monthlySpendingIncome }),
  setMonthlySpendingExpense: (monthlySpendingExpense: MonthlySpend[]) => set({ monthlySpendingExpense }),
  setTotalIncomeSpendByCategory: (totalIncomeSpendByCategory: TotalSpendByCategory[]) => set({ totalIncomeSpendByCategory }),
  setTotalExpenseSpendByCategory: (totalExpenseSpendByCategory: TotalSpendByCategory[]) => set({ totalExpenseSpendByCategory }),
  setTopExpenses: (topExpenses: TopExpenses[]) => set({ topExpenses }),
  setDailySpend: (dailySpend: DailySpend[]) => set({ dailySpend }),
}));