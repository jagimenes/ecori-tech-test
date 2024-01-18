import { useCallback, useEffect, useState } from 'react';
import customFetch from './utils/customFetch';
import { toast } from 'react-toastify';

import ListTasks from './components/ListTasks';
import InputTasks from './components/InputTasks';
import PaginationTasks from './components/PaginationTasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTitle, setSearchTitle] = useState('');
  const [searchDescription, setSearchDescription] = useState('');
  const [loadingTasks, setLoadingTasks] = useState(false);

  const getTasks = useCallback(async () => {
    try {
      setLoadingTasks(true);
      const res = await customFetch(
        `/tasks?page=${currentPage}&title=${searchTitle}&description=${searchDescription}`
      );
      const { tasks, totalPages, totalCount } = res.data;
      if (res.status === 200) {
        setTasks(tasks);
        setTotalPages(totalPages);
        setTotalCount(totalCount);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTasks(false);
    }
  }, [currentPage, searchTitle, searchDescription]);

  useEffect(() => {
    getTasks();
  }, [getTasks, currentPage, searchTitle, searchDescription]);

  const createNewTask = async (e) => {
    e.preventDefault();
    try {
      setLoadingTasks(true);
      const res = await customFetch.post('/tasks', {
        title,
        description,
        completed_at: false,
      });
      if (res.status === 201) {
        setTitle('');
        setDescription('');
        getTasks();
        toast.success('Tarefa criada com sucesso!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      setLoadingTasks(true);
      const res = await customFetch.put(`/tasks/${editTask.id}`, {
        title,
        description,
        completed_at: editTask.completed_at,
      });
      if (res.status === 200) {
        setTitle('');
        setDescription('');
        setEditTask(null);
        getTasks();
        toast.success('Tarefa editada com sucesso!');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTasks(false);
    }
  };

  const editingTask = (task) => {
    setTitle(task.title || '');
    setDescription(task.description || '');
    setEditTask({ ...task });
  };

  return (
    <main className='container'>
      <h1 className='title'>To Do List</h1>
      <div className='form__container'>
        <form className='form' onSubmit={editTask ? updateTask : createNewTask}>
          <InputTasks
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Título...'
            className='form__input'
            required
          />
          <InputTasks
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Descrição...'
            className='form__input'
            required
          />
          <button className='form__button' type='submit'>
            {editTask ? 'Editar Tarefa' : 'Criar Tarefa'}
          </button>
        </form>
      </div>
      <div className='form__container-search'>
        <form className='form'>
          <InputTasks
            type='text'
            value={searchTitle}
            onChange={(e) => setSearchTitle(e.target.value)}
            placeholder='Pesquisar por título...'
            className='form__input'
          />
          <InputTasks
            type='text'
            value={searchDescription}
            onChange={(e) => setSearchDescription(e.target.value)}
            placeholder='Pesquisar por descrição...'
            className='form__input'
          />
        </form>
      </div>
      <div className='tasks'>
        {loadingTasks && <p>Loading...</p>}
        {!loadingTasks &&
          tasks.length > 0 &&
          tasks.map((task) => (
            <ListTasks
              key={task.id}
              task={task}
              setTasks={setTasks}
              onGetTask={getTasks}
              onEditTask={editingTask}
              onLoadingTasks={setLoadingTasks}
            />
          ))}
        {!loadingTasks && (
          <PaginationTasks
            currentPage={currentPage}
            totalPages={totalPages}
            totalCount={totalCount}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </main>
  );
}
