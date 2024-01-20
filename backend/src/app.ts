import "./config/env";
import express from "express";
import cors from "cors";
import taskRouter from "./application/routes/task-router.js";
import errorHandler from "./application/middlewares/error-handlers.js";
import userRouter from "./application/routes/user-router.js";
import authenticateUserRouter from "./application/routes/authenticate-user-router.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", taskRouter);
app.use("/users", userRouter);
app.use("/login", authenticateUserRouter);

app.use(errorHandler);

export default app;
