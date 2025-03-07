import { HOME_EVENTS } from '@/src/feature/home/presentation/state/homeEvent';
import { useHomeState } from '@/src/feature/home/presentation/state/homeState';
import { getAllExpenseUseCase, getTotalSpendUseCase } from '@/src/init_dependencies';
import { GetTotalSpendUseCaseParams } from '@/src/feature/insights/domain/use-case/use-get-total-spend';
import { TotalSpend } from '@/src/feature/insights/domain/entity/TotalSpend';
import { Failure } from '@/src/core/error/failure';
import { fold } from 'fp-ts/Either';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import { GetAllExpenseUseCaseParams } from '@/src/feature/expenses/domain/use-case/use-get-all-expense';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';

export const homeBloc = {
  handleHomeEvent: async (event: string, payload: any) => {

    switch (event) {
      case HOME_EVENTS.GET_EXPENSES:
        await getExpenses(payload, useHomeState.getState);
        break;
      case HOME_EVENTS.GET_TOTAL_INCOME:
        await getTotalIncomeHandler(payload, useHomeState.getState)
        break;
      case HOME_EVENTS.GET_TOTAL_EXPENSE:
        await getTotalExpenseHandler(payload, useHomeState.getState)
        break
      default:
        break
    }
  }
}


const getTotalExpenseHandler = async (
  payload: GetTotalSpendUseCaseParams, getState: typeof useHomeState.getState
) => {
  const {setTotalExpense} = getState();

  const response = await getTotalSpendUseCase.execute(payload);

  fold<Failure, TotalSpend, void>(
    (failure) => {
      showToast('error', 'Error', failure.message || "Error fetching Total Expense")
    },
    (totalExpense) => {
      setTotalExpense(totalExpense.totalSpend)
    }
  )(response);
}


const getTotalIncomeHandler = async (
  payload: GetTotalSpendUseCaseParams, getState: typeof useHomeState.getState
) => {
  const {setTotalIncome} = getState();

  const response = await getTotalSpendUseCase.execute(payload);

  fold<Failure, TotalSpend, void>(
    (failure) => {
      showToast('error', 'Error', failure.message || "Error fetching Total Income")
    },
    (totalExpense) => {
      setTotalIncome(totalExpense.totalSpend)
    }
  )(response);
}

const getExpenses = async (
  payload: GetAllExpenseUseCaseParams, getState: typeof useHomeState.getState
) => {
  const { setExpenseList} = getState();

  const response = await getAllExpenseUseCase.execute(payload)

  fold<Failure, Expense[], void>(
    (failure) => {
      showToast('error', 'Error', failure.message || "Error fetching All Expense")
    },
    (expenses) =>{
      setExpenseList(expenses)
    }
  )(response)
}