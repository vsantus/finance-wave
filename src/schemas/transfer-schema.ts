import { z } from 'zod'

export const transferSchema = z.object({
  recipient: z
    .string()
    .trim()
    .min(3, 'Informe o nome do destinatario.')
    .max(60, 'Use no maximo 60 caracteres.'),
  description: z
    .string()
    .trim()
    .max(80, 'Use no maximo 80 caracteres.'),
  amount: z
    .number({
      error: 'Informe um valor valido.',
    })
    .positive('O valor deve ser maior que zero.')
    .max(100000, 'O valor excede o limite permitido.'),
})

export type TransferFormValues = z.infer<typeof transferSchema>
