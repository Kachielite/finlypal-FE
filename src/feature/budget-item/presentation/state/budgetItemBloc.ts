import { BUDGET_ITEM_EVENTS } from '@/src/feature/budget-item/presentation/state/budgetItemEvent';
import { useBudgetItemState } from '@/src/feature/budget-item/presentation/state/budgetItemState';
import { CreateBudgetItemUseCaseParams } from '@/src/feature/budget-item/domain/use-case/use-create-budget-item';
import {
  createBudgetItemUseCase,
  deleteBudgetItemUseCase,
  getAllBudgetItemsUseCase,
  getBudgetItemByIdUseCase,
  updateBudgetItemUseCase,
} from '@/src/init_dependencies';
import { fold } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import messages from '@/src/core/constants/messages';
import { showToast } from '@/src/shared/presentation/components/toastProvider';
import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';

export const budgetItemBloc =  {
  handleBudgetItemEvent : async (event: string, payload?: any) => {
    switch (event) {
      case BUDGET_ITEM_EVENTS.CREATE_BUDGET_ITEM:
        await createBudgetItemHandler(payload, useBudgetItemState.getState);
        break;
      case BUDGET_ITEM_EVENTS.GET_ALL_BUDGET_ITEMS:
        await getAllBudgetItemsHandler(payload, useBudgetItemState.getState);
        break;
      case BUDGET_ITEM_EVENTS.GET_BUDGET_ITEM_BY_ID:
        await getBudgetItemByIdHandler(payload, useBudgetItemState.getState);
        break;
      case BUDGET_ITEM_EVENTS.UPDATE_BUDGET_ITEM:
        await updateBudgetItemHandler(payload, useBudgetItemState.getState);
        break;
      case BUDGET_ITEM_EVENTS.DELETE_BUDGET_ITEM:
        await deleteBudgetItemHandler(payload, useBudgetItemState.getState);
        break;
      default:
        break
    }
  }
}


async function createBudgetItemHandler(payload: CreateBudgetItemUseCaseParams, getState: typeof useBudgetItemState.getState) {
  const {setIsModifyingBudgetItem} = getState();

  setIsModifyingBudgetItem(true);
  const response = await createBudgetItemUseCase.execute(payload);

  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsModifyingBudgetItem(false);
      showToast('error', 'Error!', failure.message || messages.CREATE_BUDGET_ITEMS_FAILED)
    },
    () => {
      setIsModifyingBudgetItem(false);
      showToast('success', 'Success!', messages.CREATE_BUDGET_ITEMS_SUCCESS)
    }
  )(response)
}

async function getAllBudgetItemsHandler(payload: any, getState: typeof useBudgetItemState.getState) {
  const {setBudgetItemList, setIsLoadingBudgetItems} = getState();

  setIsLoadingBudgetItems(true);
  const response = await getAllBudgetItemsUseCase.execute(payload);

  fold<Failure, BudgetItem[], void>(
    (failure) => {
      setIsLoadingBudgetItems(false);
      showToast('error', 'Error!', failure.message || messages.CREATE_BUDGET_ITEMS_FAILED)
    },
    (budgetItems) => {
      setIsLoadingBudgetItems(false);
      setBudgetItemList(budgetItems);
    }
  )(response)
}

async function getBudgetItemByIdHandler(payload: any, getState: typeof useBudgetItemState.getState) {
  const {setSelectedBudgetItem, setIsLoadingSelectedBudgetItem} = getState();

  setIsLoadingSelectedBudgetItem(true);
  const response = await getBudgetItemByIdUseCase.execute(payload);

  fold<Failure, BudgetItem, void>(
    (failure) => {
      setIsLoadingSelectedBudgetItem(false);
      showToast('error', 'Error!', failure.message || messages.CREATE_BUDGET_ITEMS_FAILED)
    },
    (budgetItem) => {
      setIsLoadingSelectedBudgetItem(false);
      setSelectedBudgetItem(budgetItem);
    }
  )(response)
}

async function updateBudgetItemHandler(payload: any, getState: typeof useBudgetItemState.getState) {
  const {setIsModifyingBudgetItem, budgetItemList} = getState();

  setIsModifyingBudgetItem(true);
  const response = await updateBudgetItemUseCase.execute(payload);

  fold<Failure, BudgetItem, void>(
    (failure) => {
      setIsModifyingBudgetItem(false);
      showToast('error', 'Error!', failure.message || messages.UPDATE_BUDGET_ITEMS_FAILED)
    },
    (budget) => {
      setIsModifyingBudgetItem(false);
      // find and update the budget item in the budget item list
      budgetItemList.map((item, index) => {
        if (item.budgetId === budget.id) {
          budgetItemList[index] = budget;
        }
        return item
      })
      showToast('success', 'Success!', messages.UPDATE_BUDGET_ITEMS_SUCCESS)
    }
  )(response)
}

async function deleteBudgetItemHandler(payload: any, getState: typeof useBudgetItemState.getState) {
  const {setIsModifyingBudgetItem, setBudgetItemList} = getState();

  setIsModifyingBudgetItem(true);
  const response = await deleteBudgetItemUseCase.execute(payload);

  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsModifyingBudgetItem(false);
      showToast('error', 'Error!', failure.message || messages.CREATE_BUDGET_ITEMS_FAILED)
    },
    () => {
      setIsModifyingBudgetItem(false);
      //Filter out deleted budget
      const updatedBudgetItemList = useBudgetItemState.getState().budgetItemList.filter((budget) => {
        return budget.id !== payload.budgetItemId
      })
      setBudgetItemList(updatedBudgetItemList);
      showToast('success', 'Success!', messages.CREATE_BUDGET_ITEMS_SUCCESS)
    }
  )(response)
}