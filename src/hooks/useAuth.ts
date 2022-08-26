import { useMemo } from 'react'
import { localStorageGet } from '../utils/localStoradre'

export const useAuth = () => {
  const user = localStorageGet(['name', 'refreshToken', 'userId', 'token', 'message'])
  return useMemo(() => ({ user }), [user])
}
