import { MonthlySpend } from '@/src/feature/insights/domain/entity/MonthlySpend';
import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';
import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';
import { create } from 'zustand';
import { DailySpend } from '@/src/feature/insights/domain/entity/DailySpend';

export interface InsightsState {
  isLoading: boolean;
  totalIncome: number;
  totalExpense: number;
  monthlySpending: MonthlySpend[];
  totalSpendByCategory: TotalSpendByCategory[];
  topExpenses: TopExpenses[];
  dailySpend: DailySpend[];
  setIsLoading: (isLoading: boolean) => void;
  setTotalIncome: (totalIncome: number) => void;
  setTotalExpense: (totalExpense: number) => void;
  setMonthlySpending: (monthlySpending: MonthlySpend[]) => void;
  setTotalSpendByCategory: (totalSpendByCategory: TotalSpendByCategory[]) => void;
  setTopExpenses: (topExpenses: TopExpenses[]) => void;
  setDailySpend: (dailySpend: DailySpend[]) => void;
}


export const useInsightsState = create<InsightsState>((set) => ({
  isLoading: false,
  totalIncome: 0,
  totalExpense: 0,
  monthlySpending: [],
  totalSpendByCategory: [],
  topExpenses: [],
  dailySpend: [],
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setTotalIncome: (totalIncome: number) => set({ totalIncome }),
  setTotalExpense: (totalExpense: number) => set({ totalExpense }),
  setMonthlySpending: (monthlySpending: MonthlySpend[]) => set({ monthlySpending }),
  setTotalSpendByCategory: (totalSpendByCategory: TotalSpendByCategory[]) => set({ totalSpendByCategory }),
  setTopExpenses: (topExpenses: TopExpenses[]) => set({ topExpenses }),
  setDailySpend: (dailySpend: DailySpend[]) => set({ dailySpend }),
}));