import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import tasksRoutes from "./routes/api/tasks";
import taskRoutes from "./routes/api/task";

const app = express();

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
  })
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/tasks", tasksRoutes);
app.use("/task", taskRoutes);

export default app;
