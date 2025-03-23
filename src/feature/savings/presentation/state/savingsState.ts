import { Savings } from '@/src/feature/savings/domain/entity/savings';
import { create } from 'zustand';

export interface SavingsState {
  isLoadingSaving: boolean;
  isModifyingSaving: boolean;
  savingList: Savings[];
  selectedSaving: Savings | null;
  modalType: 'add' | 'edit';
  setIsLoadingSaving: (isLoadingSaving: boolean) => void;
  setIsModifyingSaving: (isModifyingSaving: boolean) => void;
  setSavingList: (savingList: Savings[]) => void;
  setSelectedSaving: (selectedSaving: Savings | null) => void;
  setModalType: (modalType: 'add' | 'edit') => void;
}

export const useSavingState = create<SavingsState>((set) => ({
  isLoadingSaving: false,
  isModifyingSaving: false,
  savingList: [],
  selectedSaving: null,
  modalType: 'add',
  setIsLoadingSaving: (isLoadingSaving: boolean) => set({ isLoadingSaving }),
  setIsModifyingSaving: (isModifyingSaving: boolean) => set({ isModifyingSaving }),
  setSavingList: (savingList: Savings[]) => set({ savingList }),
  setSelectedSaving: (selectedSaving: Savings | null) => set({ selectedSaving }),
  setModalType: (modalType: 'add' | 'edit') => set({ modalType }),
}));