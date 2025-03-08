import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export type ExpenseData = {
  date: string;
  expenses: Expense[];
};

export const groupExpenseByDate = (data: Expense[]): ExpenseData[] => {
  return Object.values(
    data.reduce((acc, item) => {
      if (!acc[item.date]) {
        acc[item.date] = { date: item.date, expenses: [] };
      }
      acc[item.date].expenses.push(item);
      return acc;
    }, {} as Record<string, ExpenseData>)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};