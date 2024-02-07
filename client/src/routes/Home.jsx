import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import taskFetch from "../axios/config";

import "./Home.css";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setpage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const getTasks = async () => {
    try {
      const response = await taskFetch.get(`tasks/?pageSize=${pageSize}`);

      const data = response.data["tasks"];
      const page = response.data["page"];
      console.log(data);
      setTasks(data);
      setpage(page);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handlePagination = async () => {
    const response = await taskFetch.get(
      `tasks/?page=${page}?&pageSize=${pageSize}`
    );

    const data = response.data["tasks"];
    setTasks(data);
  };

  const handlePrevPage = () => {
    setpage(page - 1);
  };
  const handleNextPage = () => {
    setpage(page + 1);
  };

  useEffect(() => {
    handlePagination();
  }, [page]);

  return (
    <div className="home">
      <h1>Lasts Tasks</h1>
      <div className="pages">
        <button className="btn" onClick={handlePrevPage}>
          Prev
        </button>
        <button className="btn" onClick={handleNextPage}>
          Next
        </button>
      </div>
      {tasks.map((task) => (
        <div className="task" key={task.id}>
          <div className="title">
            <h2>{task.title}</h2>
            {task.completed && <span className="completed">Completed</span>}
          </div>
          <p>{task.description}</p>
          <Link to={`/tasks/${task.id}`} className="btn">
            Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
