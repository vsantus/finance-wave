import { api } from '@/services/api'
export type TransactionType = 'income' | 'expense'

export type Transaction = {
  id: string
  title: string
  category: string
  date: string
  amount: number
  type: TransactionType
  recipient?: string
}

export async function fetchTransactions() {
  const response = await api.get<Transaction[]>('/transactions')

  return response.data
}
