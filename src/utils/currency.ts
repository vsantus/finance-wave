const brlFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
})

export function formatCentsToBrlInput(valueInCents: number) {
  return brlFormatter.format(valueInCents / 100)
}

export function parseCurrencyInputToNumber(value: string) {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return 0
  }

  return Number(digits) / 100
}

export function formatCurrencyInput(value: string) {
  const digits = value.replace(/\D/g, '')

  if (!digits) {
    return ''
  }

  return formatCentsToBrlInput(Number(digits))
}
