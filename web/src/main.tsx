import './global.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import { AuthProvider } from './hooks/auth.tsx'

import { Routes } from './routes/index.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>,
)
