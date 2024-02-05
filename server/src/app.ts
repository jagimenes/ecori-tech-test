import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import tasksRoutes from "./routes/api/tasks";
import taskRoutes from "./routes/api/task";

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/tasks", tasksRoutes);
app.use("/task", taskRoutes);

export default app;
