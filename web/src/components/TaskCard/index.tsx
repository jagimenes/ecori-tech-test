import { useState } from 'react';
import { Trash2 } from 'lucide-react';

import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Label } from '../ui/label';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';
import { Badge } from '../ui/badge';

export function TaskCard({ id, title, description, completed_at, handleUpdateTask, handleToggleCompleted, handleDeleteTask }: any) {
  const [titleToUpdate, setTitleToUpdate] = useState<string>(title);
  const [descriptionToUpdate, setDescriptionToUpdate] = useState<string>(description);

  return (
    <Card className="w-[350px]">
      <CardContent className='p-6'>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <div className='flex justify-between items-center'>
                <Label>Título</Label>
                {
                  completed_at ?
                  <Badge 
                    className='bg-green-500 hover:bg-green-600 cursor-pointer'
                    onClick={() => handleToggleCompleted(id)}
                  >
                    Concluída
                  </Badge>
                  :
                  <Badge 
                    variant="secondary" 
                    className='cursor-pointer'
                    onClick={() => handleToggleCompleted(id)}
                  >
                    Em andamento
                  </Badge>
                }
              </div>
              <p className='text-sm border p-2 rounded-lg'>{title}</p>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label>Descrição</Label>
              <p className='text-sm border p-2 rounded-lg'>{description}</p>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Deletar
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
              <AlertDialogDescription>
                Essa ação não pode ser desfeita. Isso era apagar permanentemente a tarefa do banco de dados.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDeleteTask(id)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Atualizar</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Atualizar Tarefa</DialogTitle>
              <DialogDescription>
                Altere o título e descrição da tarefa.
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
                  value={titleToUpdate} 
                  onChange={e => setTitleToUpdate(e.target.value)}
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
                  value={descriptionToUpdate}
                  onChange={e => setDescriptionToUpdate(e.target.value)}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">Cancelar</Button>
                </DialogClose>
                <Button type="submit" onClick={() => handleUpdateTask(id, titleToUpdate, descriptionToUpdate)}>Salvar</Button>
              </DialogFooter>
            </form>

          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  )
}