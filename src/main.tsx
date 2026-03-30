import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClientProvider } from '@tanstack/react-query'

import { ToastRegion } from '@/components/toast-region'
import { queryClient } from '@/lib/query-client'
import faviconUrl from '@/assets/favicon.png'

import './index.css'
import App from './App.tsx'

const favicon = document.getElementById('app-favicon')

if (favicon instanceof HTMLLinkElement) {
  favicon.href = faviconUrl
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastRegion />
    </QueryClientProvider>
  </StrictMode>,
)
