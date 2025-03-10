import { INSIGHTS_EVENT } from '@/src/feature/insights/presentation/state/insightsEvent';
import { useInsightsState } from '@/src/feature/insights/presentation/state/insightsState';
import {
  getDailySpendUseCase,
  getMonthlySpendUseCase,
  getTopExpensesUseCase,
  getTotalSpendByCategoryUseCase,
  getTotalSpendUseCase,
} from '@/src/init_dependencies';
import { fold } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';
import { MonthlySpend } from '@/src/feature/insights/domain/entity/MonthlySpend';
import { TotalSpendByCategory } from '@/src/feature/insights/domain/entity/TotalSpendByCategory';
import { TopExpenses } from '@/src/feature/insights/domain/entity/TopExpenses';
import { DailySpend } from '@/src/feature/insights/domain/entity/DailySpend';

export const insightsBloc = {
  handleInsightsEvent: async (event: string, payload: any) => {
    switch (event) {
      case INSIGHTS_EVENT.GET_TOTAL_INCOME:
        await getTotalIncomeHandler(payload, useInsightsState.getState);
        break;
      case INSIGHTS_EVENT.GET_TOTAL_EXPENSE:
        await getTotalExpenseHandler(payload, useInsightsState.getState);
        break;
      case INSIGHTS_EVENT.GET_MONTHLY_SPENDING:
        await getMonthlySpendingHandler(payload, useInsightsState.getState);
        break;
      case INSIGHTS_EVENT.GET_TOTAL_SPEND_BY_CATEGORY:
        await getTotalSpendByCategoryHandler(payload, useInsightsState.getState);
        break;
      case INSIGHTS_EVENT.GET_TOP_EXPENSES:
        await getTopExpensesHandler(payload, useInsightsState.getState);
        break;
      case INSIGHTS_EVENT.GET_DAILY_SPENDING:
        await getDailySpendHandler(payload, useInsightsState.getState);
        break;
      default:
        break
    }
  }
}


export const getTotalIncomeHandler =  async (
  payload: any, getState: typeof useInsightsState.getState) => {
  const {setTotalIncome} = getState();

  const response = await getTotalSpendUseCase.execute(payload);

  fold<Failure, TotalSpend, void>(
    (failure) => {
      console.error("getTotalIncomeHandler", failure.message || "Error fetching total income")
    },
    (totalIncome) => {
      setTotalIncome(totalIncome.totalSpend)
    }
  )(response);
}

export const getTotalExpenseHandler =  async (
  payload: any, getState: typeof useInsightsState.getState) => {
  const {setTotalExpense} = getState();

  const response = await getTotalSpendUseCase.execute(payload);

  fold<Failure, TotalSpend, void>(
    (failure) => {
      console.error("getTotalExpenseHandler", failure.message || "Error fetching total expense")
    },
    (totalExpense) => {
      setTotalExpense(totalExpense.totalSpend)
    }
  )(response);
}

export const getMonthlySpendingHandler =  async (
  payload: any, getState: typeof useInsightsState.getState) => {
  const {setMonthlySpendingIncome, setMonthlySpendingExpense} = getState();

  const monthlySpendingIncome = await getMonthlySpendUseCase.execute({ ...payload, type: 'INCOME' });

  fold<Failure, MonthlySpend[], void>(
    (failure) => {
      console.error("getMonthlySpendingHandler", failure.message || "Error fetching monthly spending")
    },
    (monthlySpendingIncome) => {
      setMonthlySpendingIncome(monthlySpendingIncome)
    }
  )(monthlySpendingIncome);

  const monthlySpendingExpense = await getMonthlySpendUseCase.execute({ ...payload, type: 'EXPENSE' });

  fold<Failure, MonthlySpend[], void>(
    (failure) => {
      console.error("getMonthlySpendingHandler", failure.message || "Error fetching monthly spending")
    },
    (monthlySpendingExpense) => {
      setMonthlySpendingExpense(monthlySpendingExpense)
    }
  )(monthlySpendingExpense);
}

export const getTotalSpendByCategoryHandler =  async (
  payload: any, getState: typeof useInsightsState.getState) => {
  const {setTotalIncomeSpendByCategory, setTotalExpenseSpendByCategory} = getState();

  const totalIncomeSpendByCategory = await getTotalSpendByCategoryUseCase.execute({ ...payload, type: 'INCOME' });
  const totalExpenseSpendByCategory = await getTotalSpendByCategoryUseCase.execute({ ...payload, type: 'EXPENSE' });

  fold<Failure, TotalSpendByCategory[], void>(
    (failure) => {
      console.error("getTotalIncomeSpendByCategoryHandler", failure.message || "Error fetching total spend by category")
    },
    (totalIncomeSpendByCategory) => {
      setTotalIncomeSpendByCategory(totalIncomeSpendByCategory)
    }
  )(totalIncomeSpendByCategory);

  fold<Failure, TotalSpendByCategory[], void>(
    (failure) => {
      console.error("getTotalExpenseSpendByCategoryHandler", failure.message || "Error fetching total spend by category")
    },
    (totalExpenseSpendByCategory) => {
      setTotalExpenseSpendByCategory(totalExpenseSpendByCategory)
    }
  )(totalExpenseSpendByCategory);
}

export const getTopExpensesHandler =  async (
  payload: any, getState: typeof useInsightsState.getState
) => {
  const {setTopExpenses} = getState();

  const response = await getTopExpensesUseCase.execute(payload);

  fold<Failure, TopExpenses[], void>(
    (failure) => {
      console.error("getTopExpensesHandler", failure.message || "Error fetching top expenses")
    },
    (topExpenses) => {
      setTopExpenses(topExpenses)
    }
  )(response);
}

export const getDailySpendHandler =  async (
  payload: any, getState: typeof useInsightsState.getState
) => {
  const {setDailySpend} = getState();

  const response = await getDailySpendUseCase.execute(payload);

  fold<Failure, DailySpend[], void>(
    (failure) => {
      console.error("getDailySpendHandler", failure.message || "Error fetching daily spend")
    },
    (dailySpend) => {
      setDailySpend(dailySpend)
    }
  )(response);
}

