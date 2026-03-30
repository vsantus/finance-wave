import { CheckCircle2, X, XCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { useToastStore } from '@/store/toast-store'

export function ToastRegion() {
  const toasts = useToastStore((state) => state.toasts)
  const dismissToast = useToastStore((state) => state.dismissToast)

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex w-[min(92vw,24rem)] flex-col gap-3">
      {toasts.map((toast) => {
        const isSuccess = toast.variant === 'success'

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 rounded-2xl border border-border bg-[rgba(255,253,248,0.96)] p-4 shadow-[0_18px_48px_-28px_rgba(47,39,24,0.28)] backdrop-blur-xl"
          >
            <div
              className={
                isSuccess
                  ? 'mt-0.5 text-primary'
                  : 'mt-0.5 text-[#EF4444]'
              }
            >
              {isSuccess ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <XCircle className="size-5" />
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-1">
              <p className="text-sm font-semibold text-foreground">{toast.title}</p>
              {toast.description ? (
                <p className="text-sm leading-6 text-muted-foreground">
                  {toast.description}
                </p>
              ) : null}
            </div>

            <Button
              aria-label="Fechar notificacao"
              className="shrink-0"
              onClick={() => dismissToast(toast.id)}
              size="icon-sm"
              variant="ghost"
            >
              <X className="size-4" />
            </Button>
          </div>
        )
      })}
    </div>
  )
}
