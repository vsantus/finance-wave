import type { Transaction } from '@/services/transactions-service'

export type CreateTransferInput = {
  amount: number
  recipient: string
  description: string
}

export function calculateBalance(transactions: Transaction[]) {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === 'income') {
      return total + transaction.amount
    }

    return total - transaction.amount
  }, 0)
}

export function canTransfer(balance: number, amount: number) {
  return amount > 0 && amount <= balance
}

export function buildTransferTransaction({
  amount,
  recipient,
  description,
}: CreateTransferInput): Transaction {
  return {
    id: crypto.randomUUID(),
    title: description.trim() || `Transferencia para ${recipient}`,
    category: 'Transferencias',
    date: new Date().toISOString(),
    amount,
    type: 'expense',
    recipient: recipient.trim(),
  }
}
