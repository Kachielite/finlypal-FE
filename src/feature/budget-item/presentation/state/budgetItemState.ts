import { BudgetItem } from '@/src/feature/budget-item/domain/entity/budget-item';
import { create } from 'zustand';

export interface BudgetItemState {
  isLoadingBudgetItems: boolean;
  isModifyingBudgetItem: boolean;
  isLoadingSelectedBudgetItem: boolean;
  budgetItemList: BudgetItem[];
  selectedBudgetItem: BudgetItem | null;
  modalType: 'add' | 'edit';
  setIsLoadingBudgetItems: (isLoadingBudgetItems: boolean) => void;
  setIsModifyingBudgetItem: (isModifyingBudgetItem: boolean) => void;
  setIsLoadingSelectedBudgetItem: (isLoadingSelectedBudgetItem: boolean) => void;
  setBudgetItemList: (budgetItemList: BudgetItem[]) => void;
  setSelectedBudgetItem: (selectedBudgetItem: BudgetItem | null) => void;
  setModalType: (modalType: 'add' | 'edit') => void;
}

export const useBudgetItemState = create<BudgetItemState>((set) => ({
  isLoadingBudgetItems: false,
  isModifyingBudgetItem: false,
  isLoadingSelectedBudgetItem: false,
  budgetItemList: [],
  selectedBudgetItem: null,
  modalType: 'add',
  setIsLoadingBudgetItems: (isLoadingBudgetItems) => set({ isLoadingBudgetItems }),
  setIsModifyingBudgetItem: (isModifyingBudgetItem) => set({ isModifyingBudgetItem }),
  setIsLoadingSelectedBudgetItem: (isLoadingSelectedBudgetItem) => set({ isLoadingSelectedBudgetItem }),
  setBudgetItemList: (budgetItemList) => set({ budgetItemList }),
  setSelectedBudgetItem: (selectedBudgetItem) => set({ selectedBudgetItem }),
  setModalType: (modalType) => set({ modalType }),
})) 