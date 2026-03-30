import { useEffect } from 'react'

import { useTransactionsQuery } from '@/hooks/use-transactions-query'
import { useFinanceStore } from '@/store/finance-store'

export function useAccountData() {
  const query = useTransactionsQuery()
  const seedAccount = useFinanceStore((state) => state.seedAccount)
  const isInitialized = useFinanceStore((state) => state.isInitialized)

  useEffect(() => {
    if (query.data && !isInitialized) {
      seedAccount(query.data)
    }
  }, [isInitialized, query.data, seedAccount])

  return query
}
