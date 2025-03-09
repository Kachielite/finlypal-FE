import { Expense } from '@/src/feature/expenses/domain/entity/expense';
import { create } from 'zustand';
import { Category } from '@/src/feature/category/domain/entity/category';

export interface ExpenseState {
  page: number,
  hasMore: boolean
  isLoading: boolean,
  isLoadingMore: boolean,
  isModifyingExpense: boolean,
  isResettingForm: boolean
  showFilterModal: boolean,
  showCreateExpenseModal: boolean,
  modalType: 'add' | 'edit',
  expenseList: Expense[],
  selectedExpense: Expense | null,
  categoryList: Category[],
  setPage: (update: number | ((prev: number) => number)) => void;
  setHasMore: (hasMore: boolean) => void,
  setIsLoading: (isLoading: boolean) => void,
  setIsLoadingMore: (isLoadingMore: boolean) => void,
  setIsModifyingExpense: (isModifyingExpense: boolean) => void,
  setIsResettingForm: (isResettingForm: boolean) => void,
  setShowFilterModal: (showFilterModal: boolean) => void,
  setShowCreateExpenseModal: (showCreateExpenseModal: boolean) => void,
  setExpenseList: (update: Expense[] | ((prev: Expense[]) => Expense[])) => void;
  setSelectedExpense: (selectedExpense: Expense | null) => void
  setModalType: (modalType: 'add' | 'edit') => void
  setCategoryList: (categoryList: Category[]) => void
}

export const useExpenseState = create<ExpenseState>((set) => ({
  page: 0,
  hasMore: true,
  isLoading: false,
  isLoadingMore: false,
  isModifyingExpense: false,
  isResettingForm: false,
  showFilterModal: false,
  showCreateExpenseModal: false,
  modalType: 'add',
  expenseList: [],
  selectedExpense: null,
  categoryList: [],

  // ✅ Supports both direct and function-based updates
  setPage: (update) =>
    set((state) => ({
      page: typeof update === "function" ? update(state.page) : update,
    })),

  setHasMore: (hasMore) => set({ hasMore }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setIsLoadingMore: (isLoadingMore) => set({ isLoadingMore }),
  setIsModifyingExpense: (isModifyingExpense) => set({ isModifyingExpense }),
  setIsResettingForm: (isResettingForm) => set({ isResettingForm }),
  setShowFilterModal: (showFilterModal) => set({ showFilterModal }),
  setShowCreateExpenseModal: (showCreateExpenseModal) => set({ showCreateExpenseModal }),
  setModalType: (modalType) => set({ modalType }),
  // ✅ Supports both direct and function-based updates
  setExpenseList: (update) =>
    set((state) => ({
      expenseList: typeof update === "function" ? update(state.expenseList) : update,
    })),
  setSelectedExpense: (selectedExpense) => set({ selectedExpense }),
  setCategoryList: (categoryList) => set({ categoryList }),
}));