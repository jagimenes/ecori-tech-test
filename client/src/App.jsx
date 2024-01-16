import { useEffect, useState } from 'react';
import customFetch from './utils/customFetch';
import Tasks from './Tasks';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editTask, setEditTask] = useState(null);

  const getTasks = async () => {
    try {
      const res = await customFetch('/tasks');
      const { tasks } = res.data;
      setTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

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
            {editTask ? 'Update Task' : 'Create Task'}
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
      </div>
    </main>
  );
}
