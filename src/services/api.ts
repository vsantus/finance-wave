import axios from 'axios'
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { mockTransactions } from '@/services/mock-data'

const mockAdapter: AxiosAdapter = async (
  config: InternalAxiosRequestConfig,
): Promise<AxiosResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 650))

  if (config.url === '/transactions' && config.method === 'get') {
    return {
      data: mockTransactions,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    }
  }

  throw new Error(`Unhandled mock request: ${config.method} ${config.url}`)
}

export const api = axios.create({
  baseURL: '/api',
  adapter: mockAdapter,
})
