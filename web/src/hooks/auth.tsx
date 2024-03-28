import {createContext, useContext, useState, useEffect} from 'react';

import { api } from '@/services/api';

export const AuthContext = createContext({});

interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserData {
  user?: string;
  token?: string;
}

function AuthProvider({children}: AuthProviderProps) {
  const [data, setData] = useState<UserData>({});

  async function signIn({email, password}: {email:string, password:string}) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      });

      const {user, token} = response.data;

      localStorage.setItem("@ecoritest:user", JSON.stringify(user));
      localStorage.setItem("@ecoritest:token", token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({user, token});
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível se conectar ao servidor. Tente novamente mais tarde.");
      }
    }
  }

  async function signUp({name, email, password}: {name:string, email:string, password:string}) {
    try {
      await api.post('/users', {
        name,
        email,
        password
      });

      return 'ok';
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível se conectar ao servidor. Tente novamente mais tarde.");
      }
    }
  }

  async function signOut() {
    localStorage.removeItem("@ecoritest:user");
    localStorage.removeItem("@ecoritest:token");

    setData({});
  }

  useEffect(() => {
    const user = localStorage.getItem("@ecoritest:user");
    const token = localStorage.getItem("@ecoritest:token");

    if (token && user) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setData({
        user: JSON.parse(user),
        token
      });
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        user: data.user
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}


export {AuthProvider, useAuth};