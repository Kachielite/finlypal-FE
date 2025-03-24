import { create } from 'zustand';

export interface AccountState{
  isModifyingUser: boolean,
  setIsModifyingUser: (isModifyingUser: boolean) => void,
}

export const useAccountState = create<AccountState>()(
  (set) => ({
    isModifyingUser: false,
    setIsModifyingUser: (isModifyingUser: boolean) => set({ isModifyingUser }),
  })
)