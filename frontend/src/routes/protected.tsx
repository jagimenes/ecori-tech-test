import { Navigate, Outlet } from 'react-router-dom'

import { useAuthStore } from '@/stores/auth'

export function Protected({ isProtected }: { isProtected: boolean }) {
  const token = useAuthStore((state) => state.token)

  const isSigned = !!token

  if (!isSigned && isProtected) {
    return <Navigate to="/sign-in" />
  }

  if (isSigned && !isProtected) {
    return <Navigate to="/" />
  }

  return <Outlet />
}
