import { useSavingState } from '@/src/feature/savings/presentation/state/savingsState';
import { CreateSavingsUseCaseParams } from '@/src/feature/savings/domain/use-case/use-create-savings';
import {
  createSavingsUseCase,
  deleteSavingsUseCase,
  getAllSavingsUseCase,
  getSavingsByIdUseCase,
  updateSavingsUseCase,
} from '@/src/init_dependencies';
import { fold } from 'fp-ts/Either';
import { Failure } from '@/src/core/error/failure';
import { Savings } from '@/src/feature/savings/domain/entity/savings';
import { UpdateSavingsUseCaseParams } from '@/src/feature/savings/domain/use-case/use-update-savings';
import { GeneralResponse } from '@/src/shared/domain/entity/general-response';
import { DeleteSavingsUseCaseParams } from '@/src/feature/savings/domain/use-case/use-delete-savings';
import { GetAllSavingsUseCaseParams } from '@/src/feature/savings/domain/use-case/use-get-all-savings';
import { GetSavingsByIdUseCaseParams } from '@/src/feature/savings/domain/use-case/use-get-savings-by-id';
import { SavingsSchema } from '@/src/core/validation/savings-validation';

export const savingsBloc = {
  handleSavingsEvents: async (event: any, payload: any) => {
    switch(event) {
      case 'CREATE_SAVINGS':
        await createSavingsHandler(payload, useSavingState.getState);
        break;
      case 'UPDATE_SAVINGS':
        await updateSavingsHandler(payload, useSavingState.getState);
        break;
      case 'GET_ALL_SAVINGS':
        await getAllSavingsHandler(payload, useSavingState.getState);
        break;
      case 'GET_SAVINGS_BY_ID':
        await getSavingsByIdHandler(payload, useSavingState.getState);
        break;
      case 'DELETE_SAVINGS':
        await deleteSavingsHandler(payload, useSavingState.getState);
        break;
      default:
        console.log('Invalid event', event);
    }
  }
}

export const createSavingsHandler = async (
  payload: typeof SavingsSchema._type, getState: typeof useSavingState.getState
) => {
  const {setSavingList, setIsModifyingSaving, savingList} = getState();

  const response = await createSavingsUseCase.execute(new CreateSavingsUseCaseParams(payload));

  setIsModifyingSaving(true);
  fold<Failure, Savings, void>(
    (failure) => {
      setIsModifyingSaving(false);
      console.error("createSavingsHandler error in savings bloc =>", failure.message || "Error creating savings")
    },
    (savings) => {
      setSavingList([savings, ...savingList])
      setIsModifyingSaving(false);
    }
  )(response);
}

export const updateSavingsHandler = async (
  payload: {data: typeof SavingsSchema._type, savingsId: number }, getState: typeof useSavingState.getState
) => {
  const {setSavingList, setIsModifyingSaving, savingList} = getState();

  const response = await updateSavingsUseCase.execute(new UpdateSavingsUseCaseParams(payload.savingsId, payload.data));

  setIsModifyingSaving(true);
  fold<Failure, Savings, void>(
    (failure) => {
      setIsModifyingSaving(false);
      console.error("updateSavingsHandler error in savings bloc =>", failure.message || "Error creating savings")
    },
    (savings) => {
      // find the index of the savings to be updated
      const index = savingList.findIndex((saving) => saving.id === savings.id);
      // update the savings
      savingList[index] = savings;
      // update the savings list
      setSavingList([...savingList]);
      setIsModifyingSaving(false);
    }
  )(response);
}

export const getAllSavingsHandler = async (
  payload: GetAllSavingsUseCaseParams, getState: typeof useSavingState.getState
) => {
  const {setSavingList, setIsLoadingSaving} = getState();

  setIsLoadingSaving(true);

  // get all savings
  const response = await getAllSavingsUseCase.execute(payload);

  fold<Failure, Savings[], void>(
    (failure) => {
      setIsLoadingSaving(false);
      console.error("getAllSavingsHandler error in savings bloc =>", failure.message || "Error fetching savings")
    },
    (savingsList) => {
      setSavingList(savingsList);
      setIsLoadingSaving(false);
    }
  )(response);
}

export const getSavingsByIdHandler = async (
  payload: GetSavingsByIdUseCaseParams, getState: typeof useSavingState.getState
) => {
  const {setSelectedSaving, setIsLoadingSaving} = getState();

  setIsLoadingSaving(true);

  // get the savings by id
  const response = await getSavingsByIdUseCase.execute(payload);

  fold<Failure, Savings, void>(
    (failure) => {
      setIsLoadingSaving(false);
      console.error("getSavingsByIdHandler error in savings bloc =>", failure.message || "Error fetching savings")
    },
    (savings) => {
      setSelectedSaving(savings);
      setIsLoadingSaving(false);
    }
  )(response);
}

export const deleteSavingsHandler = async (
  payload: DeleteSavingsUseCaseParams, getState: typeof useSavingState.getState
) => {
  const {setSavingList, setIsModifyingSaving, savingList} = getState();

  const response = await deleteSavingsUseCase.execute(payload);

  setIsModifyingSaving(true);
  fold<Failure, GeneralResponse, void>(
    (failure) => {
      setIsModifyingSaving(false);
      console.error("deleteSavingsHandler error in savings bloc =>", failure.message || "Error creating savings")
    },
    () => {
      // filter out the savings to be deleted
      const updatedSavingList = savingList.filter((saving) => saving.id !== payload.savingsId);
      // update the savings list
      setSavingList(updatedSavingList);
      setIsModifyingSaving(false);
    }
  )(response);
}

