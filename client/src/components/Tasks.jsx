import customFetch from '../utils/customFetch';
import {
  FaRegTrashAlt,
  FaRegCircle,
  FaRegCheckCircle,
  FaRegEdit,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

export default function Tasks({ task, setTasks, onGetTask, onEditTask }) {
  const { id, title, description, completed_at } = task;

  const updateCheckTask = async (taskId, taskCheck) => {
    try {
      const res = await customFetch.patch(`/tasks/${taskId}`, {
        completed_at: taskCheck,
      });

      if (res.status === 200) {
        setTasks((currentTasks) => {
          return currentTasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, completed_at: taskCheck };
            }
            return task;
          });
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await customFetch.delete(`/tasks/${taskId}`);
      if (res.status === 204) {
        setTasks((currentTasks) => {
          return currentTasks.filter((task) => task.id !== taskId);
        });
        onGetTask();
        toast.success('Tarefa excluída com sucesso!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='task'>
      <div className='task__content'>
        <h4>{title}</h4>
        <p>{description}</p>
      </div>
      <div className='task__content-btn'>
        <button className='task__edit' onClick={() => onEditTask(task)}>
          <FaRegEdit />
        </button>
        <button
          className='task__status'
          onClick={() => updateCheckTask(id, !completed_at)}
        >
          {completed_at ? <FaRegCheckCircle /> : <FaRegCircle />}
        </button>
        <button className='task__delete' onClick={() => deleteTask(id)}>
          <FaRegTrashAlt />
        </button>
      </div>
    </div>
  );
}
