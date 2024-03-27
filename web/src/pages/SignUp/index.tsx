import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { api } from '@/services/api';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';

export function SignUp() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  async function handleSignUp() {
    if (!name || !email || !password) {
      return alert("Preencha todos os dados para se cadastrar.");
    }
    try {
      await api.post('/users', {
        name,
        email,
        password
      });
      navigate("/");
      alert("Usuário criado com sucesso!");
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível se conectar ao servidor. Tente novamente mais tarde.");
      }
    }
  }

  return (
    <div className='mx-auto my-auto space-y-5 flex flex-col items-center justify-center bg-slate-100 w-full h-screen'>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Criar conta</CardTitle>
          <CardDescription>Insira seus dados para criar uma conta.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input 
                  id="name" 
                  placeholder="Insira seu nome" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  placeholder="Insira seu email" 
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className='flex items-center relative'>
                  <Input 
                    id="password" 
                    placeholder="Insira sua senha" 
                    type={showPassword ? 'text' : 'password'} 
                    className='relative'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {
                    showPassword 
                    ? 
                    <Eye className="w-4 h-4 mr-2 absolute right-2 cursor-pointer" onClick={handleShowPassword} /> 
                    : 
                    <EyeOff className="w-4 h-4 mr-2 absolute right-2 cursor-pointer" onClick={handleShowPassword} />
                  }
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={handleSignUp}>Cadastrar</Button>
        </CardFooter>
      </Card>

      <Button variant="link" className='text-right' onClick={() => navigate('/')}>Voltar para login</Button>
    </div>
  )
}