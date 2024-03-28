import {BrowserRouter} from 'react-router-dom';

import { useAuth } from '@/hooks/auth';

import { AppRoutes } from './app.routes';
import { AuthRoutes } from './auth.routes';

interface AuthData {
  user?: string;
}

export function Routes() {
  const {user} = useAuth() as AuthData;

  return (
    <BrowserRouter>
      {user ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  )
}