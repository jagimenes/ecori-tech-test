import "./config/env";
import express from "express";
import cors from "cors";
import taskRouter from "./application/routes/task-router.js";
import errorHandler from "./application/middlewares/error-handlers.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRouter);

app.use(errorHandler);

export default app;
