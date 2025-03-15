import { Budget } from '@/src/feature/budget/domain/entity/budget';
import { create } from 'zustand';

export interface BudgetState {
  isLoadingBudgets:boolean;
  isModifyingBudget: boolean;
  showCreateBudgetModal: boolean;
  showFilterModal: boolean;
  budgetList: Budget[];
  setIsLoadingBudgets: (isLoadingBudgets: boolean) => void;
  setIsModifyingBudget: (isModifyingBudget: boolean) => void;
  setShowCreateBudgetModal: (showCreateBudgetModal: boolean) => void;
  setShowFilterModal: (showFilterModal: boolean) => void;
  setBudgetList: (budgetList: Budget[]) => void;
}

export const useBudgetState = create<BudgetState>((set) => ({
  isLoadingBudgets: false,
  isModifyingBudget: false,
  showCreateBudgetModal: false,
  showFilterModal: false,
  budgetList: [],
  setIsLoadingBudgets: (isLoadingBudgets) => set({ isLoadingBudgets }),
  setIsModifyingBudget: (isModifyingBudget) => set({ isModifyingBudget }),
  setShowCreateBudgetModal: (showCreateBudgetModal) => set({ showCreateBudgetModal }),
  setShowFilterModal: (showFilterModal) => set({ showFilterModal }),
  setBudgetList: (budgetList) => set({ budgetList }),
}))