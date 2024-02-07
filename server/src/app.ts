import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import tasksRoutes from "./routes/api/tasks";
import tasksUpload from "./routes/api/upload";
import taskRoutes from "./routes/api/task";

import multer from "multer";

const app = express();
const upload = multer({ dest: "uploads/" });

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

app.post("/upload", upload.single("csv"), tasksUpload);
app.use("/tasks", tasksRoutes);
app.use("/task", taskRoutes);

export default app;
