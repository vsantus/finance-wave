import { ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import { Card } from '@/components/ui/card'
import type { Transaction } from '@/services/transactions-service'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'medium',
})

type TransactionItemProps = {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const isIncome = transaction.type === 'income'

  return (
    <Card className="gap-0 rounded-[1.4rem] border border-border bg-card p-0 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white/80">
      <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={
              isIncome
                ? 'flex size-11 items-center justify-center rounded-2xl bg-[#e3efe8] text-primary'
                : 'flex size-11 items-center justify-center rounded-2xl bg-[#f7e6e6] text-destructive'
            }
          >
            {isIncome ? (
              <ArrowDownLeft className="size-5" />
            ) : (
              <ArrowUpRight className="size-5" />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-base font-semibold tracking-tight text-foreground">
              {transaction.title}
            </p>
            <p className="text-sm text-muted-foreground">
              {transaction.category} {'|'}{' '}
              {dateFormatter.format(new Date(transaction.date))}
            </p>
            {transaction.recipient ? (
              <p className="text-sm text-muted-foreground">
                Destinatario: {transaction.recipient}
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 sm:items-end">
          <p
            className={
              isIncome
                ? 'text-lg font-semibold tracking-tight text-primary'
                : 'text-lg font-semibold tracking-tight text-foreground'
            }
          >
            {isIncome ? '+' : '-'}
            {currencyFormatter.format(transaction.amount)}
          </p>
          <span
            className={
              isIncome
                ? 'rounded-full border border-primary/10 bg-[#e3efe8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary'
                : 'rounded-full border border-border bg-muted/55 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground'
            }
          >
            {isIncome ? 'Entrada' : 'Saida'}
          </span>
        </div>
      </div>
    </Card>
  )
}
