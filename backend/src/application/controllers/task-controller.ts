import { NextFunction, Request, Response } from "express";
import CreateTask from "../use-cases/task/create-task";
import UpdateTask from "../use-cases/task/update-task";
import DeleteTask from "../use-cases/task/delete-task";

export default class TaskController {
  constructor(
    private readonly createTask: CreateTask,
    private readonly updateTask: UpdateTask,
    private readonly deleteTask: DeleteTask
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description } = req.body;
      const result = await this.createTask.execute({ title, description });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      if (!id) throw new Error("id is null or undefined");

      const result = await this.updateTask.execute({ id, title, description });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) throw new Error("id is null or undefined");

      await this.deleteTask.execute(id);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };
}
