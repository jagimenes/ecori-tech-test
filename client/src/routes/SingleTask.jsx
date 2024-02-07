import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import taskFetch from "../axios/config";
import "./SingleTask.css";

function SingleTask() {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleChanged, setTitleChanged] = useState(false);
  const [descriptionChanged, setDescriptionChanged] = useState(false);

  const getTask = async () => {
    try {
      const response = await taskFetch.get(`/tasks/${taskId}`);
      const data = response.data;
      setTask(data);
      setTitle(data.title);
      setDescription(data.description);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();

    try {
      await taskFetch.put(`/tasks/${taskId}`, {
        title,
        description,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async () => {
    try {
      await taskFetch.delete(`tasks/${taskId}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const markCompleted = async () => {
    try {
      await taskFetch.put(`task/${taskId}`);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  return (
    <div className="">
      {task &&
        task.map((taskItem) => (
          <div className="task" key={taskItem.id}>
            <h1>Task {taskItem.id}</h1>
            <form onSubmit={(e) => updateTask(e)}>
              <div className="form-control">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={titleChanged ? title : taskItem.title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setTitleChanged(true);
                  }}
                />
              </div>
              <div className="form-control">
                <label htmlFor="description">Description:</label>
                <textarea
                  name="description"
                  id="description"
                  value={
                    descriptionChanged ? description : taskItem.description
                  }
                  onChange={(e) => {
                    setDescription(e.target.value);
                    setDescriptionChanged(true);
                  }}
                />
              </div>
              <input type="submit" value="Save" />
            </form>
            <div className="details">
              <div className="date">
                <span>
                  <strong>Created at:</strong> {taskItem.created_at}
                </span>
                {taskItem.updated_at && (
                  <span>
                    <strong>Updated at:</strong> {taskItem.updated_at}
                  </span>
                )}
              </div>
              <div className="btns">
                <button className="btn" onClick={deleteTask}>
                  Delete
                </button>
                <button className="btn completed" onClick={markCompleted}>
                  Completed
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SingleTask;
