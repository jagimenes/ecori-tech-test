/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import customFetch from './utils/customFetch';
import Tasks from './Tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTask, setEditTask] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const getTasks = async (page = 1) => {
    try {
      const res = await customFetch(`/tasks?page=${currentPage}`);
      const { tasks, totalPages, totalCount } = res.data;
      console.log(tasks, totalPages, totalCount);
      setTasks(tasks);
      setTotalPages(totalPages);
      setTotalCount(totalCount);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [currentPage]);

  const createNewTask = async (e) => {
    e.preventDefault();
    try {
      await customFetch.post('/tasks', {
        title,
        description,
        completed_at: false,
      });
    } catch (error) {
      console.error(error);
    }
    setTitle('');
    setDescription('');
    getTasks();
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
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
      }
    } catch (error) {
      console.error(error);
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
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Title...'
            className='form__input'
            required
          />
          <input
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='Description...'
            className='form__input'
            required
          />
          <button className='form__button' type='submit'>
            {editTask ? 'Editar Tarefa' : 'Criar Tarefa'}
          </button>
        </form>
      </div>
      {/* <div className='form__container-search'>
        <form className='form' onSubmit={createNewTask}>
          <input
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Title...'
            className='form__input'
            required
          />
          <input
            type='text'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Description...'
            className='form__input'
            required
          />
          <button className='form__button' type='submit'>
            Search
          </button>
        </form>
      </div> */}
      <div className='tasks'>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <Tasks
              key={task.id}
              task={task}
              setTasks={setTasks}
              onGetTask={getTasks}
              onEditTask={editingTask}
            />
          ))}

        <div className='pagination'>
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
            }
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}, Total de Tarefas: {totalCount}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Próximo
          </button>
        </div>
      </div>
    </main>
  );
}
