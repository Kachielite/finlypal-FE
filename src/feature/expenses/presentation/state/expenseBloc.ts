import { EXPENSE_EVENTS } from '@/src/feature/expenses/presentation/state/expenseEvent';
import { useExpenseState } from '@/src/feature/expenses/presentation/state/expenseState';
import {
  createExpenseUseCase,
  deleteExpenseUseCase,
  getAllExpenseUseCase,
  getCategoriesUseCase,
  updateExpenseUseCase,
} from '@/src/init_dependencies';
import { CreateExpenseUseCaseParams } from '@/src/feature/expenses/domain/use-case/use-create-expense';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { Failure } from '@/src/core/error/failure';
import { fold } from 'fp-ts/Either';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { GetAllExpenseUseCaseParams } from '@/src/feature/expenses/domain/use-case/use-get-all-expense';
import { UpdateExpenseUseCaseParams } from '@/src/feature/expenses/domain/use-case/use-update-expense';
import { DeleteExpenseUseCaseParams } from '@/src/feature/expenses/domain/use-case/use-delete-expense';
import { GetCategoriesUseCaseParams } from '@/src/feature/category/domain/use-case/use-get-categories';
import { Category } from '@/src/feature/category/domain/entity/category';

export const expenseBloc = {
  handleExpenseEvent: async (event: string, payload: any) => {
    switch (event) {
      case EXPENSE_EVENTS.CREATE_EXPENSE:
        await createExpenseHandler(payload, useExpenseState.getState);
        break;
      case EXPENSE_EVENTS.GET_EXPENSES:
        await getExpensesHandler(payload, useExpenseState.getState);
        break;
      case EXPENSE_EVENTS.UPDATE_EXPENSE:
        await updateExpenseHandler(payload, useExpenseState.getState);
        break;
      case EXPENSE_EVENTS.DELETE_EXPENSE:
        await deleteExpenseHandler(payload, useExpenseState.getState);
        break;
      case EXPENSE_EVENTS.GET_CATEGORIES:
        await getCategories(payload, useExpenseState.getState);
        break;
      default:
        break
    }
  }
}

export const createExpenseHandler = async (
  payload: CreateExpenseUseCaseParams, getState: typeof useExpenseState.getState
) => {
  const {setIsModifyingExpense, setShowCreateExpenseModal} = getState();
  const response = await createExpenseUseCase.execute(payload);

  setIsModifyingExpense(false);
  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsModifyingExpense(false);
      showToast('error', 'Error', failure.message || "Error creating expense")
    },
    (generalResponse) => {
      setIsModifyingExpense(false);
      setShowCreateExpenseModal(false);
      showToast('success', 'Success', generalResponse.message || "Expense created successfully")
    }
  )(response);
}

export const getExpensesHandler = async (
  payload: GetAllExpenseUseCaseParams, getState: typeof useExpenseState.getState
) => {
  const {setExpenseList} = getState();

  const response = await getAllExpenseUseCase.execute(payload);

  fold<Failure, Expense[], void>(
    (failure) => {
      showToast('error', 'Error', failure.message || "Error fetching All Expense")
    },
    (expenses) => {
      setExpenseList(expenses)
    }
  )(response);
}

export const updateExpenseHandler = async (
  payload: UpdateExpenseUseCaseParams, getState: typeof useExpenseState.getState
) => {
  const {setIsModifyingExpense, setShowCreateExpenseModal} = getState();
  const response = await updateExpenseUseCase.execute(payload);

  setIsModifyingExpense(false);
  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsModifyingExpense(false);
      showToast('error', 'Error', failure.message || "Error updating expense")
    },
    (generalResponse) => {
      setIsModifyingExpense(false);
      setShowCreateExpenseModal(false);
      showToast('success', 'Success', generalResponse.message || "Expense updated successfully")
    }
  )(response);
}

export const deleteExpenseHandler = async (
  payload: DeleteExpenseUseCaseParams, getState: typeof useExpenseState.getState
) => {
  const {setIsModifyingExpense, setShowCreateExpenseModal} = getState();
  const response = await deleteExpenseUseCase.execute(payload);

  setIsModifyingExpense(false);
  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsModifyingExpense(false);
      showToast('error', 'Error', failure.message || "Error deleting expense")
    },
    (generalResponse) => {
      setIsModifyingExpense(false);
      setShowCreateExpenseModal(false);
      showToast('success', 'Success', generalResponse.message || "Expense deleted successfully")
    }
  )(response);
}

export const getCategories = async (
  payload: GetCategoriesUseCaseParams, getState: typeof useExpenseState.getState
) => {
  const {setCategoryList} = getState();

  const response = await getCategoriesUseCase.execute(payload);

  fold<Failure, Category[], void>(
    (failure) => {
      showToast('error', 'Error', failure.message || "Error fetching categories")
    },
    (categories) => {
      setCategoryList(categories)
    }
  )(response);
}

