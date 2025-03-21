import { useBudgetState } from '@/src/feature/budget/presentation/state/budgetState';
import { BUDGET_EVENTS } from '@/src/feature/budget/presentation/state/budgetEvents';
import { CreateBudgetUseCaseParams } from '@/src/feature/budget/domain/use-case/use-create-budget';
import {
  createBudgetUseCase,
  deleteBudgetUseCase,
  getAllBudgetsUseCase,
  getBudgetByIdUseCase,
  updateBudgetUseCase,
} from '@/src/init_dependencies';
import { fold } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import messages from '@/src/core/constants/messages';
import { GetAllBudgetUseCaseParams } from '@/src/feature/budget/domain/use-case/use-get-all-budgets';
import { UpdateBudgetUseCaseParams } from '@/src/feature/budget/domain/use-case/use-update-budget';
import { DeleteBudgetUseCaseParams } from '@/src/feature/budget/domain/use-case/use-delete-budget';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { GetBudgetByIdBudgetUseCaseParams } from '@/src/feature/budget/domain/use-case/use-get-budget-by-id';


export const budgetBloc = {
  handleBudgetEvent: async (event: string, payload?: any) => {
    switch (event) {
      case BUDGET_EVENTS.CREATE_BUDGET:
        await createBudgetHandler(payload, useBudgetState.getState);
        break;
      case BUDGET_EVENTS.GET_BUDGETS:
        await getBudgetsHandler(payload, useBudgetState.getState);
        break;
        case BUDGET_EVENTS.GET_BUDGET_BY_ID:
        await getBudgetByIdHandler(payload, useBudgetState.getState);
        break;
      case BUDGET_EVENTS.UPDATE_BUDGET:
        await updateBudgetHandler(payload, useBudgetState.getState);
        break;
      case BUDGET_EVENTS.DELETE_BUDGET:
        await deleteBudgetHandler(payload, useBudgetState.getState);
        break;
      default:
        break
    }
  },
}

async function createBudgetHandler(payload: CreateBudgetUseCaseParams, getState: typeof useBudgetState.getState) {
  const {setIsModifyingBudget, budgetList, setBudgetList} = getState();

  setIsModifyingBudget(true);
  const response = await createBudgetUseCase.execute(payload);

  fold<Failure, Budget, void>(
    (failure) => {
      setIsModifyingBudget(false);
      showToast('error', 'Error!', failure.message || messages.CREATE_BUDGET_FAILED)
    },
    (budget) => {
      setIsModifyingBudget(false);
      setBudgetList([...budgetList, budget]);
      showToast('success', 'Success!', messages.CREATE_BUDGET_SUCCESS)
    }
  )(response)
}

async function getBudgetsHandler(payload: GetAllBudgetUseCaseParams, getState: typeof useBudgetState.getState) {
  const {setBudgetList, setIsLoadingBudgets} = getState();

  setIsLoadingBudgets(true);
  const response = await getAllBudgetsUseCase.execute(payload);

  fold<Failure, Budget[], void>(
    (failure) => {
      setIsLoadingBudgets(false);
      showToast('error', 'Error!', failure.message || messages.GET_ALL_BUDGETS_FAILED)
    },
    (budgets) => {
      setIsLoadingBudgets(false);
      setBudgetList(budgets.reverse());
    }
  )(response)
}

async function getBudgetByIdHandler(payload: GetBudgetByIdBudgetUseCaseParams, getState: typeof useBudgetState.getState) {
  const {setIsLoadingSelectedBudget, setSelectedBudget} = getState();
  setIsLoadingSelectedBudget(true);
  const response = await getBudgetByIdUseCase.execute(payload);

  fold<Failure, Budget, void>(
    (failure) => {
      setIsLoadingSelectedBudget(false);
      showToast('error', 'Error!', failure.message || messages.GET_BUDGET_FAILED)
    },
    (budget) => {
      setIsLoadingSelectedBudget(false);
      setSelectedBudget(budget);
    }
  )(response)
}

async function updateBudgetHandler(payload: UpdateBudgetUseCaseParams, getState: typeof useBudgetState.getState) {
  const {setIsModifyingBudget, budgetList, setBudgetList} = getState();

  setIsModifyingBudget(true);
  const response = await updateBudgetUseCase.execute(payload);

  fold<Failure, Budget, void>(
    (failure) => {
      setIsModifyingBudget(false);
      showToast('error', 'Error!', failure.message || messages.UPDATE_BUDGET_FAILED)
    },
    (updatedBudget) => {
      //Filter out updated budget and replace it with the new one
      const updatedBudgetList = budgetList.map((budget) => {
        if (budget.id === updatedBudget.id) {
          return updatedBudget;
        }
        return budget;
      });
      setBudgetList(updatedBudgetList);
      setIsModifyingBudget(false);
      showToast('success', 'Success!', messages.UPDATE_BUDGET_SUCCESS)
    }
  )(response)
}

async function deleteBudgetHandler(payload: DeleteBudgetUseCaseParams, getState: typeof useBudgetState.getState) {
  const {setIsModifyingBudget, setBudgetList} = getState();

  setIsModifyingBudget(true);
  const response = await deleteBudgetUseCase.execute(payload);

  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsModifyingBudget(false);
      showToast('error', 'Error!', failure.message || messages.DELETE_BUDGET_FAILED)
    },
    () => {
      //Filter out deleted budget
      const updatedBudgetList = useBudgetState.getState().budgetList.filter((budget) => {
        return budget.id !== payload.budgetId
      })
      setBudgetList(updatedBudgetList);
      setIsModifyingBudget(false);
      showToast('success', 'Success!', messages.DELETE_BUDGET_SUCCESS)
    }
  )(response)
}