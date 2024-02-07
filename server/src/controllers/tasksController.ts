import { Request, Response } from "express";
import taskService from "../services/taskService";

class tasksController {
  async getAllTasks(req: Request, res: Response) {
    try {
      const titleFilters = (req.query.title as string) ?? "%%";
      const descriptionFilters = (req.query.description as string) ?? "%%";
      const page: number = parseInt((req.query.page as string) ?? "1");
      const pageSize: number = parseInt((req.query.pageSize as string) ?? "10");

      const tasks = await taskService.getAllTasks({
        titleFilters,
        descriptionFilters,
        page,
        pageSize,
      });

      res.status(200).json({
        page: page,
        pageSize: pageSize,
        totalTasks: tasks.length,
        tasks,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message:
          "Error when searching for tasks. Please check the parameters sent.",
      });
    }
  }

  async getTaskById(req: Request, res: Response) {
    try {
      const taskId = req.params.id;

      const task = await taskService.getTaskById(taskId);

      res.status(200).json(task);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message:
          "Error when searching for task. Please check the parameter sent.",
      });
    }
  }

  async createNewTask(req: Request, res: Response): Promise<void> {
    try {
      const { title, description } = req.body;
      const newTask = await taskService.createNewTask({ title, description });

      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res
        .status(400)
        .json({ message: "Error updating task. Please check the data sent." });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const taskId = req?.params?.id;
      const { title, description } = req.body;

      const updatedTask = await taskService.updateTask({
        taskId,
        title,
        description,
      });

      res.status(200).json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Error updating task. Please check the data sent.",
      });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const taskId = req.params.id;

      const deletedTask = await taskService.deleteTask(taskId);

      res.status(200).json({ message: "task deleted", task: deletedTask });
    } catch (error) {
      console.error(error);
      res.status(400).json({
        message: "Error deleting task. Please check the ID sent.",
      });
    }
  }

  async taskCompleted(req: Request, res: Response) {
    try {
      const taskId = req.params.id;

      const completionMessage = await taskService.completeTask(taskId);

      res.status(200).json(completionMessage);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error to complete task.",
      });
    }
  }
}

export default new tasksController();
