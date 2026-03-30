import { zodResolver } from '@hookform/resolvers/zod'
import { SendHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useAccountData } from '@/hooks/use-account-data'
import {
  type TransferFormValues,
  transferSchema,
} from '@/schemas/transfer-schema'
import { canTransfer } from '@/store/finance-helpers'
import { useFinanceStore } from '@/store/finance-store'
import { useToastStore } from '@/store/toast-store'
import { formatCurrencyInput, parseCurrencyInputToNumber } from '@/utils/currency'

const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function TransferPage() {
  const navigate = useNavigate()
  const { isLoading } = useAccountData()
  const pushToast = useToastStore((state) => state.pushToast)
  const balance = useFinanceStore((state) => state.balance)
  const createTransfer = useFinanceStore((state) => state.createTransfer)
  const [amountInput, setAmountInput] = useState('')

  const form = useForm<TransferFormValues>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      recipient: '',
      description: '',
      amount: 0,
    },
  })

  function onSubmit(values: TransferFormValues) {
    if (!canTransfer(balance, values.amount)) {
      form.setError('amount', {
        message: 'Saldo insuficiente para concluir a transferência.',
      })

      pushToast({
        variant: 'error',
        title: 'Transferência não realizada',
        description: 'O valor informado excede o saldo disponível.',
      })

      return
    }

    createTransfer(values)
    form.reset()
    setAmountInput('')
    pushToast({
      variant: 'success',
      title: 'Transferência enviada',
      description: 'O saldo e o histórico foram atualizados.',
    })
    navigate('/dashboard')
  }

  return (
    <main className="flex min-h-screen items-center">
      <div className="app-shell flex w-full justify-center">
        <Card className="w-full max-w-2xl border-border bg-card">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div className="space-y-3">
              <p className="eyebrow">Transferência</p>
              <div className="space-y-2">
                <CardTitle className="text-3xl text-foreground">
                  Enviar dinheiro
                </CardTitle>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground">
                  Um fluxo direto para transferências, com poucos campos,
                  validação clara e atualização imediata do saldo.
                </p>
              </div>
            </div>

            <Button asChild variant="outline">
              <Link to="/dashboard">Voltar</Link>
            </Button>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="rounded-3xl border border-border bg-muted/65 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Saldo disponível
              </p>
              <p className="mt-3 text-4xl font-semibold tracking-tight text-foreground">
                {isLoading
                  ? 'Sincronizando...'
                  : currencyFormatter.format(balance)}
              </p>
            </div>

            <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-foreground"
                  htmlFor="recipient"
                >
                  Destinatário
                </label>
                <Input
                  aria-invalid={Boolean(form.formState.errors.recipient)}
                  id="recipient"
                  placeholder="Nome ou chave do destinatário"
                  {...form.register('recipient')}
                />
                {form.formState.errors.recipient ? (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.recipient.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-foreground"
                  htmlFor="amount"
                >
                  Valor
                </label>
                <Input
                  aria-invalid={Boolean(form.formState.errors.amount)}
                  id="amount"
                  inputMode="decimal"
                  placeholder="R$ 0,00"
                  type="text"
                  value={amountInput}
                  onChange={(event) => {
                    const formattedValue = formatCurrencyInput(event.target.value)

                    setAmountInput(formattedValue)
                    form.setValue(
                      'amount',
                      parseCurrencyInputToNumber(event.target.value),
                      { shouldDirty: true, shouldValidate: true },
                    )
                  }}
                />
                {form.formState.errors.amount ? (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.amount.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label
                  className="text-sm font-semibold text-foreground"
                  htmlFor="description"
                >
                  Descrição
                </label>
                <Input
                  aria-invalid={Boolean(form.formState.errors.description)}
                  id="description"
                  placeholder="Opcional: motivo da transferência"
                  {...form.register('description')}
                />
                {form.formState.errors.description ? (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.description.message}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  O saldo será atualizado assim que a operação for concluída.
                </p>

                <Button
                  disabled={form.formState.isSubmitting || isLoading}
                  size="lg"
                  type="submit"
                >
                  <SendHorizontal className="size-4" />
                  Confirmar transferência
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
