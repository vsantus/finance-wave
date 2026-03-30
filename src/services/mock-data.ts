import type { Transaction } from '@/services/transactions-service'

export const mockAuthUser = {
  id: 'user-1',
  name: 'Fulano',
  email: 'fulano@email.dev',
  password: '123456',
} as const

export const mockTransactions: Transaction[] = [
  {
    id: 'trx-1',
    title: 'Salário',
    category: 'Receitas',
    date: '2026-03-25',
    amount: 5200,
    type: 'income',
  },
  {
    id: 'trx-2',
    title: 'Aluguel',
    category: 'Transferências',
    date: '2026-03-26',
    amount: 1800,
    type: 'expense',
    recipient: 'Imobiliária',
  },
  {
    id: 'trx-3',
    title: 'Despesa',
    category: 'Transferências',
    date: '2026-03-27',
    amount: 420.5,
    type: 'expense',
    recipient: 'Supermercado',
  },
  {
    id: 'trx-4',
    title: 'Freela',
    category: 'Extras',
    date: '2026-03-28',
    amount: 950,
    type: 'income',
  },
]
