import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { mockAuthUser } from '@/services/mock-data'

export type AuthUser = {
  id: string
  name: string
  email: string
}

export type LoginInput = {
  email: string
  password: string
  name?: string
}

type AuthState = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (input: LoginInput) => boolean
  logout: () => void
}

const storage = createJSONStorage(() => localStorage)

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: ({ email, password }) => {
        const normalizedEmail = email.trim().toLowerCase()
        const isValidCredentials =
          normalizedEmail === mockAuthUser.email &&
          password === mockAuthUser.password

        if (!isValidCredentials) {
          set({
            user: null,
            isAuthenticated: false,
          })

          return false
        }

        set({
          user: {
            id: mockAuthUser.id,
            email: mockAuthUser.email,
            name: mockAuthUser.name,
          },
          isAuthenticated: true,
        })

        return true
      },
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'finance-wave-auth',
      storage,
    },
  ),
)
