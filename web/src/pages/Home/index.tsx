import { useEffect, useState } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


import { api } from '@/services/api';
import { useAuth } from '@/hooks/auth';

import { TaskCard } from '@/components/TaskCard';
import { ShowPagination } from '@/components/ShowPagination';
import { SkeletonCard } from '@/components/SkeletonCard';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


interface AuthContextProps {
  user?: {name:string};
  signOut?: () => void;
}


export function Home() {
  const { user, signOut } = useAuth() as AuthContextProps;
  const navigate = useNavigate();

  const name = user?.name;
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [search, setSearch] = useState<string>('');
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  async function handleGetTasks() {
    setIsLoading(true);
    const { data } = await api.get(`/?page=${currentPage}&search=${search}`);
    setData(data.data);
    setTotalPages(Math.ceil(Number(data.totalCount)/2));
    setIsLoading(false);
  }

  function handlePageChange(pageNumber: number) {
    setCurrentPage(pageNumber);
  }

  function handleSearchChange(search: string) {
    setCurrentPage(1);
    setSearch(search);
  }

  useEffect(() => {
    handleGetTasks();
  }, [currentPage, search]);

  async function handleCreateTask() {
    setIsLoading(true);
    if (!newTaskTitle || !newTaskDescription) {
      return
    }
    try {
      await api.post('/', {
        title: newTaskTitle,
        description: newTaskDescription
      });
      setNewTaskTitle('');
      setNewTaskDescription('');
      setIsLoading(false);
      handleGetTasks();
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('Erro inesperado ao criar tarefa, por favor tente novamente mais tarde!');
      }
      setIsLoading(false);
    }
  }

  async function handleUpdateTask(id: number, title: string, description: string) {
    setIsLoading(true);
    console.log(id, title, description)
    try {
      await api.put(`/${id}`, {
        title,
        description
      });
      setIsLoading(false);
      setSearch('');
      handleGetTasks();
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('Erro inesperado ao atualizar tarefa, por favor tente novamente mais tarde!');
      }
      setIsLoading(false);
    }
  }

  async function handleToggleCompleted(id: number) {
    setIsLoading(true);
    try {
      await api.patch(`/${id}`);
      setIsLoading(false);
      setSearch('');
      handleGetTasks();
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('Erro inesperado ao atualizar tarefa, por favor tente novamente mais tarde!');
      }
      setIsLoading(false);
    }
  }

  async function handleDeleteTask(id: number) {
    setIsLoading(true);
    try {
      await api.delete(`/${id}`);
      setIsLoading(false);
      setSearch('');
      setCurrentPage(1);
      handleGetTasks();
    } catch (error: any) {
      if (error.response) {
        alert(error.response.data.error);
      } else {
        alert('Erro inesperado ao deletar tarefa, por favor tente novamente mais tarde!');
      }
      setIsLoading(false);
    }
  }

  function handleSignOut() {
    navigate('/');

    if (signOut){
      signOut();
    }
  }


  return (
    <div className='p-6 mx-auto space-y-4 flex flex-col items-center bg-slate-100 w-full h-screen'>
      <h1 className='text-2xl md:text-3xl font-bold'>Task Management</h1>
      <div className='absolute right-6 top-0'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Menu</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Olá {name}!</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className='flex items-center justify-between w-[350px]'>
        <form className='flex items-center gap-2 w-full'>
          <Input name='search' placeholder='Pesquisar por tarefa' value={search} onChange={e => handleSearchChange(e.target.value)}/>
          <Button>
            <Search className="w-4 h-4 mr-2" />
            Pesquisar
          </Button>
        </form>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusCircle className="w-4 h-4 mr-2" />
            Adicionar
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar Tarefa</DialogTitle>
            <DialogDescription>
              Adicione um título e uma descrição da tarefa.
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Título
              </Label>
              <Input 
                id="title" 
                placeholder="Título da tarefa" 
                className="col-span-3" 
                value={newTaskTitle} 
                onChange={e => setNewTaskTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descrição
              </Label>
              <Input 
                id="description" 
                placeholder="Descrição da tarefa" 
                className="col-span-3"
                value={newTaskDescription}
                onChange={e => setNewTaskDescription(e.target.value)}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancelar</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" onClick={handleCreateTask}>Salvar</Button>
              </DialogClose>
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>

      <div className='flex flex-col md:flex-row md:pt-20 items-center gap-4'>
        {
          isLoading
          ?
          <>
            <SkeletonCard />
            <SkeletonCard />
          </>
          :
          data && data.map((task: any) => (
            <TaskCard 
              key={task.id} 
              title={task.title} 
              description={task.description} 
              id={task.id}
              completed_at={task.completed_at}
              handleDeleteTask={handleDeleteTask}
              handleUpdateTask={handleUpdateTask}
              handleToggleCompleted={handleToggleCompleted}
            />
          ))
        }
      </div>

      <div className='absolute bottom-6 '>
        <ShowPagination onPageChange={handlePageChange} totalPages={totalPages}/>
      </div>

    </div>
  )
}