import { create } from 'zustand'

import type { Transaction } from '@/services/transactions-service'
import {
  buildTransferTransaction,
  calculateBalance,
  type CreateTransferInput,
} from '@/store/finance-helpers'

type FinanceState = {
  transactions: Transaction[]
  balance: number
  isInitialized: boolean
  seedAccount: (transactions: Transaction[]) => void
  createTransfer: (input: CreateTransferInput) => void
}

export const useFinanceStore = create<FinanceState>()((set) => ({
  transactions: [],
  balance: 0,
  isInitialized: false,
  seedAccount: (transactions) =>
    set((state) => {
      if (state.isInitialized) {
        return state
      }

      return {
        transactions,
        balance: calculateBalance(transactions),
        isInitialized: true,
      }
    }),
  createTransfer: ({ amount, recipient, description }) =>
    set((state) => {
      const nextTransaction = buildTransferTransaction({
        amount,
        recipient,
        description,
      })

      const transactions = [nextTransaction, ...state.transactions]

      return {
        transactions,
        balance: calculateBalance(transactions),
      }
    }),
}))
