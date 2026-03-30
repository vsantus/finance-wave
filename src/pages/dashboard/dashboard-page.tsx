import { ArrowRight, WalletCards } from 'lucide-react'
import { Link } from 'react-router-dom'

import { DashboardMetricCard } from '@/components/dashboard/dashboard-metric-card'
import { TransactionItem } from '@/components/dashboard/transaction-item'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAccountData } from '@/hooks/use-account-data'
import { useAuthStore } from '@/store/auth-store'
import { useFinanceStore } from '@/store/finance-store'
import { useToastStore } from '@/store/toast-store'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function DashboardPage() {
  const { user, logout } = useAuthStore()
  const { isLoading, isError } = useAccountData()
  const pushToast = useToastStore((state) => state.pushToast)
  const balance = useFinanceStore((state) => state.balance)
  const transactions = useFinanceStore((state) => state.transactions)

  console.log(transactions, "transactions");


  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((total, transaction) => total + transaction.amount, 0)
  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((total, transaction) => total + transaction.amount, 0)

  function handleLogout() {
    logout()
    pushToast({
      variant: 'success',
      title: 'Sessão encerrada',
      description: 'Você saiu da conta demo com segurança.',
    })
  }

  return (
    <main className="min-h-screen">
      <div className="app-shell">
        <div className="flex flex-col gap-8">
          <section className="space-y-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className="eyebrow">Dashboard</p>
                <div className="space-y-2">
                  <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
                    Olá, {user?.name ?? 'cliente'}
                  </h1>
                  <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                    Aqui está um resumo das suas finanças, com saldo,
                    entradas e saídas atualizados em tempo real.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <Button asChild size="lg">
                  <Link to="/transfer">
                    Nova transferência
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button onClick={handleLogout} size="lg" variant="outline">
                  Sair
                </Button>
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              <DashboardMetricCard
                className="bg-card"
                label="Saldo disponível"
                value={currencyFormatter.format(balance)}
              />
              <DashboardMetricCard
                className="border-primary/10 bg-[#eef5f0]"
                label="Entradas"
                value={currencyFormatter.format(income)}
                valueClassName="text-primary"
              />
              <DashboardMetricCard
                className="bg-[#f6efe8]"
                label="Saídas"
                value={currencyFormatter.format(expenses)}
              />
            </div>
          </section>

          <Card className="border-border bg-card">
            <CardHeader className="flex flex-row items-end justify-between gap-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Histórico
                </p>
                <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                  <WalletCards className="size-5 text-primary" />
                  Últimas transações
                </CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">
                {transactions.length} lançamento(s)
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoading ? (
                <div className="space-y-3">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-24 animate-pulse rounded-[1.4rem] border border-border bg-muted/65"
                    />
                  ))}
                </div>
              ) : null}

              {isError ? (
                <p className="rounded-2xl border border-destructive/20 bg-[#f7e6e6] px-4 py-6 text-sm text-destructive">
                  Não foi possível carregar as transações.
                </p>
              ) : null}

              {!isLoading && !isError && transactions.length > 0 ? (
                <ul className="space-y-3">
                  {transactions.map((transaction) => (
                    <li key={transaction.id}>
                      <TransactionItem transaction={transaction} />
                    </li>
                  ))}
                </ul>
              ) : null}

              {!isLoading && !isError && transactions.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-border bg-muted/65 px-4 py-6 text-sm text-muted-foreground">
                  Nenhuma transação encontrada.
                </p>
              ) : null}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
