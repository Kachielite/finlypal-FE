import { MonthlySpend } from '@/src/feature/insights/domain/entity/MonthlySpend';
import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';
import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';
import { create } from 'zustand';
import { DailySpend } from '@/src/feature/insights/domain/entity/DailySpend';
import moment from 'moment/moment';

export interface InsightsState {
  isLoading: boolean;
  startDate: string;
  endDate: string;
  totalIncome: number;
  totalExpense: number;
  monthlySpendingIncome: MonthlySpend[];
  monthlySpendingExpense: MonthlySpend[];
  totalExpenseSpendByCategory: TotalSpendByCategory[];
  totalIncomeSpendByCategory: TotalSpendByCategory[];
  topIncomes: TopExpenses[];
  topExpenses: TopExpenses[];
  dailySpend: DailySpend[];
  setIsLoading: (isLoading: boolean) => void;
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
  setTotalIncome: (totalIncome: number) => void;
  setTotalExpense: (totalExpense: number) => void;
  setMonthlySpendingIncome: (monthlySpending: MonthlySpend[]) => void;
  setMonthlySpendingExpense: (monthlySpending: MonthlySpend[]) => void;
  setTotalExpenseSpendByCategory: (totalExpenseSpendByCategory: TotalSpendByCategory[]) => void;
  setTotalIncomeSpendByCategory: (totalIncomeSpendByCategory: TotalSpendByCategory[]) => void;
  setTopIncomes: (topIncomes: TopExpenses[]) => void;
  setTopExpenses: (topExpenses: TopExpenses[]) => void;
  setDailySpend: (dailySpend: DailySpend[]) => void;
}


export const useInsightsState = create<InsightsState>((set) => ({
  isLoading: false,
  startDate: moment().subtract(1, 'year').format('YYYY-MM-DD'),
  endDate: moment().format('YYYY-MM-DD'),
  totalIncome: 0,
  totalExpense: 0,
  monthlySpendingIncome: [],
  monthlySpendingExpense: [],
  totalIncomeSpendByCategory: [],
  totalExpenseSpendByCategory: [],
  topIncomes: [],
  topExpenses: [],
  dailySpend: [],
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setStartDate: (startDate: string) => set({startDate}),
  setEndDate: (endDate: string) => set({endDate}),
  setTotalIncome: (totalIncome: number) => set({ totalIncome }),
  setTotalExpense: (totalExpense: number) => set({ totalExpense }),
  setMonthlySpendingIncome: (monthlySpendingIncome: MonthlySpend[]) => set({ monthlySpendingIncome }),
  setMonthlySpendingExpense: (monthlySpendingExpense: MonthlySpend[]) => set({ monthlySpendingExpense }),
  setTotalIncomeSpendByCategory: (totalIncomeSpendByCategory: TotalSpendByCategory[]) => set({ totalIncomeSpendByCategory }),
  setTotalExpenseSpendByCategory: (totalExpenseSpendByCategory: TotalSpendByCategory[]) => set({ totalExpenseSpendByCategory }),
  setTopIncomes: (topIncomes: TopExpenses[]) => set({topIncomes}),
  setTopExpenses: (topExpenses: TopExpenses[]) => set({ topExpenses }),
  setDailySpend: (dailySpend: DailySpend[]) => set({ dailySpend }),
}));