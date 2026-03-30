import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { LoginPage } from '@/pages/login/login-page'
import { TransferPage } from '@/pages/transfer/transfer-page'
import { ProtectedRoute } from '@/routes/protected-route'

const router = createBrowserRouter([
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
  {
    path: '*',
    element: <Navigate replace to="/dashboard" />,
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
