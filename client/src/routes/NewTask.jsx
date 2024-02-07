import React, { useState } from "react";
import taskFetch from "../axios/config";
import { useNavigate } from "react-router-dom";

import "./NewTask.css";

const NewTask = () => {
  const navigate = useNavigate();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  const newTask = async (e) => {
    e.preventDefault();

    await taskFetch.post("/tasks", {
      title,
      description,
    });

    navigate("/");
  };

  return (
    <div className="new-task">
      <h2>New Task</h2>
      <form onSubmit={(e) => newTask(e)}>
        <div className="form-control">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title here"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-control">
          <label htmlFor="description">Description:</label>
          <textarea
            name="description"
            id="description"
            placeholder="Description here"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <input type="submit" value="New task" />
      </form>
    </div>
  );
};

export default NewTask;
