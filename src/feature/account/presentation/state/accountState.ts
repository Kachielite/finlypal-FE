import { create } from 'zustand';
import { Currency } from '@/src/feature/account/domain/entity/currency';

export interface AccountState{
  isModifyingUser: boolean,
  setIsModifyingUser: (isModifyingUser: boolean) => void,
  currencyList: Currency[]
  setCurrencyList: (currencyList: Currency[]) => void
}

export const useAccountState = create<AccountState>()(
  (set) => ({
    isModifyingUser: false,
    setIsModifyingUser: (isModifyingUser: boolean) => set({ isModifyingUser }),
    currencyList: [],
    setCurrencyList: (currencyList: Currency[]) => set({ currencyList })
  })
)