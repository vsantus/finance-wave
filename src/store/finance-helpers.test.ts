import { describe, expect, it } from 'vitest'

import {
  buildTransferTransaction,
  calculateBalance,
  canTransfer,
} from '@/store/finance-helpers'

describe('finance helpers', () => {
  it('cria uma transação de despesa e atualiza o saldo calculado.', () => {
    const initialTransactions = [
      {
        id: '1',
        title: 'Salario',
        category: 'Receitas',
        date: '2026-03-25',
        amount: 5000,
        type: 'income' as const,
      },
    ]

    const transfer = buildTransferTransaction({
      amount: 750,
      recipient: 'Ana',
      description: 'Transferencia aluguel',
    })

    const nextBalance = calculateBalance([transfer, ...initialTransactions])

    expect(transfer.type).toBe('expense')
    expect(transfer.recipient).toBe('Ana')
    expect(canTransfer(5000, 750)).toBe(true)
    expect(nextBalance).toBe(4250)
  })
})
