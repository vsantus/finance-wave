import { create } from 'zustand'

export type ToastVariant = 'success' | 'error'

export type Toast = {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

type ToastInput = Omit<Toast, 'id'>

type ToastState = {
  toasts: Toast[]
  pushToast: (toast: ToastInput) => void
  dismissToast: (id: string) => void
}

export const useToastStore = create<ToastState>()((set) => ({
  toasts: [],
  pushToast: (toast) => {
    const id = crypto.randomUUID()

    set((state) => ({
      toasts: [...state.toasts, { ...toast, id }],
    }))

    window.setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((item) => item.id !== id),
      }))
    }, 3200)
  },
  dismissToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}))
