import { useQuery } from '@tanstack/react-query'

import { fetchTransactions } from '@/services/transactions-service'

export function useTransactionsQuery() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  })
}
