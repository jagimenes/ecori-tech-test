import React from "react";
import taskFetch from "../axios/config";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const response = await taskFetch.get("/tasks");

      const data = response.data["tasks"];
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskFetch.delete(`tasks/${id}`);
      getTasks();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="home">
      <h1>Last Tasks</h1>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button className="btn" onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
