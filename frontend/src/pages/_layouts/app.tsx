import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/components/sidebar'

export function AppLayout() {
  return (
    <div className="min-h-screen w-full flex antialiased">
      <Sidebar />

      <Outlet />
    </div>
  )
}
