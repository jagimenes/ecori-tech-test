import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/auth';

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

interface AuthContextProps {
  signIn?: ({email, password}: {email:string, password:string}) => void;
}

export function SignIn() {
  const navigate = useNavigate();
  
  const { signIn } = useAuth() as AuthContextProps;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  function handleSignIn() {
    if (signIn){
      signIn({email, password});
    }
  }

  return (
    <div className='mx-auto my-auto space-y-5 flex flex-col items-center justify-center bg-slate-100 w-full h-screen'>

      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Faça login</CardTitle>
          <CardDescription>Logue para acessar suas tarefas.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
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
          <Button onClick={handleSignIn}>Entrar</Button>
        </CardFooter>
      </Card>

      <Button variant="link" className='text-right' onClick={() => navigate('/register')}>Fazer cadastro</Button>
    </div>
  )
}