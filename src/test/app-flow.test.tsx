import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, Navigate, RouterProvider } from 'react-router-dom'

import { ToastRegion } from '@/components/toast-region'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { LoginPage } from '@/pages/login/login-page'
import { TransferPage } from '@/pages/transfer/transfer-page'
import { ProtectedRoute } from '@/routes/protected-route'
import { mockAuthUser } from '@/services/mock-data'
import { useAuthStore } from '@/store/auth-store'
import { useFinanceStore } from '@/store/finance-store'
import { useToastStore } from '@/store/toast-store'

function resetStores() {
  localStorage.removeItem('finance-wave-auth')

  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
  })

  useFinanceStore.setState({
    transactions: [],
    balance: 0,
    isInitialized: false,
  })

  useToastStore.setState({
    toasts: [],
  })
}

function renderAppFlow(initialEntries = ['/dashboard']) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  const router = createMemoryRouter(
    [
      {
        path: '/',
        element: <Navigate replace to="/dashboard" />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: '/dashboard',
            element: <DashboardPage />,
          },
          {
            path: '/transfer',
            element: <TransferPage />,
          },
        ],
      },
    ],
    {
      initialEntries,
    },
  )

  return {
    user: userEvent.setup(),
    queryClient,
    router,
    ...render(
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastRegion />
      </QueryClientProvider>,
    ),
  }
}

describe('user flow', () => {
  beforeEach(() => {
    resetStores()
  })

  it('permite ao usuário fazer login, transferir dinheiro e visualizar o painel atualizado.', async () => {
    const { user } = renderAppFlow()

    expect(await screen.findByText(/entrar na conta/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/email/i), mockAuthUser.email)
    await user.type(screen.getByLabelText(/senha/i), mockAuthUser.password)
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(
      await screen.findByRole('heading', {
        name: new RegExp(mockAuthUser.name, 'i'),
      }),
    ).toBeInTheDocument()

    expect(
      await screen.findByText(/4 lan[çc]amento\(s\)/i),
    ).toBeInTheDocument()

    await user.click(
      screen.getByRole('link', { name: /nova transfer[êe]ncia/i }),
    )

    expect(await screen.findByText(/enviar dinheiro/i)).toBeInTheDocument()

    await user.type(screen.getByLabelText(/destinat[áa]rio/i), 'Maria')
    await user.type(screen.getByLabelText(/valor/i), '50000')
    await user.type(screen.getByLabelText(/descri[çc][ãa]o/i), 'Teste aluguel')
    await user.click(
      screen.getByRole('button', { name: /confirmar transfer[êe]ncia/i }),
    )

    expect(
      await screen.findByRole('heading', {
        name: new RegExp(mockAuthUser.name, 'i'),
      }),
    ).toBeInTheDocument()

    await waitFor(() => {
      expect(useFinanceStore.getState().balance).toBe(3429.5)
    })

    expect(useFinanceStore.getState().transactions[0]).toMatchObject({
      amount: 500,
      recipient: 'Maria',
      type: 'expense',
    })

    expect(
      await screen.findByText(/5 lan[çc]amento\(s\)/i),
    ).toBeInTheDocument()
    expect(
      await screen.findByText(/destinat[áa]rio:\s*maria/i),
    ).toBeInTheDocument()
  })
})
