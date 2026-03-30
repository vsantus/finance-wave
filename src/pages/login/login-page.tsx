import { zodResolver } from '@hookform/resolvers/zod'
import { Landmark, LockKeyhole, Mail } from 'lucide-react'
import { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { type LoginFormValues, loginSchema } from '@/schemas/login-schema'
import { useAuthStore } from '@/store/auth-store'
import { useToastStore } from '@/store/toast-store'

type RouterState = {
  from?: {
    pathname?: string
  }
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuthStore()
  const pushToast = useToastStore((state) => state.pushToast)
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const redirectTo = useMemo(() => {
    const state = location.state as RouterState | null

    return state?.from?.pathname || '/dashboard'
  }, [location.state])

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />
  }

  function onSubmit(values: LoginFormValues) {
    const isAuthenticated = login({
      email: values.email,
      password: values.password,
    })

    if (!isAuthenticated) {
      form.setError('email', {
      })
      form.setError('password', {
        message: 'Email ou senha inválidos.',
      })

      pushToast({
        variant: 'error',
        title: 'Acesso negado',
        description: 'Use as credenciais válidas para entrar na sua conta.',
      })

      return
    }

    pushToast({
      variant: 'success',
      title: 'Sessão iniciada',
      description: 'Voce entrou no paínel da sua conta.',
    })

    navigate(redirectTo, { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center">
      <div className="app-shell flex w-full items-center">
        <div className="app-grid w-full items-center lg:grid-cols-[1.15fr_0.85fr]">
          <section className="flex flex-col justify-center gap-8 py-4 lg:py-0">
            <div className="inline-flex w-fit items-center gap-3 rounded-full border border-border bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-[0_18px_36px_-24px_rgba(47,39,24,0.22)]">
              <Landmark className="size-4" />
              Finance Wave
            </div>

            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[4.25rem] lg:leading-[1.02]">
                O jeito mais simples de visualizar e mover o seu dinheiro.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Um fluxo de acesso enxuto, moderno e confiável para navegar por
                saldo, histórico financeiro e transferências com resposta
                imediata.
              </p>
            </div>


          </section>

          <Card className="w-full max-w-xl justify-center self-center overflow-hidden border-border bg-card">
            <CardHeader className="space-y-3">
              <p className="eyebrow">Acesso seguro</p>
              <CardTitle className="text-3xl text-foreground sm:text-[2rem]">
                Entrar na conta
              </CardTitle>

            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-foreground" htmlFor="email">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      aria-invalid={Boolean(form.formState.errors.email)}
                      className="pl-11"
                      id="email"
                      placeholder="voce@email.dev"
                      {...form.register('email')}
                    />
                  </div>
                  {form.formState.errors.email ? (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.email.message}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <label
                    className="text-sm font-semibold text-foreground"
                    htmlFor="password"
                  >
                    Senha
                  </label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      aria-invalid={Boolean(form.formState.errors.password)}
                      className="pl-11"
                      id="password"
                      placeholder="********"
                      type="password"
                      {...form.register('password')}
                    />
                  </div>
                  {form.formState.errors.password ? (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.password.message}
                    </p>
                  ) : null}
                </div>

                <div className="rounded-2xl border border-border bg-muted/65 p-4 text-sm text-muted-foreground">
                  Credenciais:{' '}
                  <span className="font-semibold text-foreground">
                    fulano@email.dev
                  </span>{' '}
                  / <span className="font-semibold text-foreground">123456</span>
                </div>

                <Button className="w-full" size="lg" type="submit">
                  Entrar
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
