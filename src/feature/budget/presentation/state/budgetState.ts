import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { create } from 'zustand';

export interface BudgetState {
  isLoadingBudgets:boolean;
  isModifyingBudget: boolean;
  isLoadingSelectedBudget: boolean;
  showCreateBudgetModal: boolean;
  showFilterModal: boolean;
  budgetList: Budget[];
  selectedBudget: Budget | null;
  modalType: 'add' | 'edit';
  setIsLoadingBudgets: (isLoadingBudgets: boolean) => void;
  setIsModifyingBudget: (isModifyingBudget: boolean) => void;
  setIsLoadingSelectedBudget: (isLoadingSelectedBudget: boolean) => void;
  setShowCreateBudgetModal: (showCreateBudgetModal: boolean) => void;
  setShowFilterModal: (showFilterModal: boolean) => void;
  setBudgetList: (budgetList: Budget[]) => void;
  setSelectedBudget: (selectedBudget: Budget | null) => void;
  setModalType: (modalType: 'add' | 'edit') => void
}

export const useBudgetState = create<BudgetState>((set) => ({
  isLoadingBudgets: false,
  isModifyingBudget: false,
  isLoadingSelectedBudget: false,
  showCreateBudgetModal: false,
  showFilterModal: false,
  budgetList: [],
  selectedBudget: null,
  modalType: 'add',
  setIsLoadingBudgets: (isLoadingBudgets) => set({ isLoadingBudgets }),
  setIsModifyingBudget: (isModifyingBudget) => set({ isModifyingBudget }),
  setIsLoadingSelectedBudget: (isLoadingSelectedBudget) => set({ isLoadingSelectedBudget }),
  setShowCreateBudgetModal: (showCreateBudgetModal) => set({ showCreateBudgetModal }),
  setShowFilterModal: (showFilterModal) => set({ showFilterModal }),
  setBudgetList: (budgetList) => set({ budgetList }),
  setSelectedBudget: (selectedBudget) => set({ selectedBudget }),
  setModalType: (modalType) => set({ modalType })
}))