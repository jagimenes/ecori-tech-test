import { NextFunction, Request, Response } from "express";
import {
  CompleteTask,
  CreateTask,
  DeleteTask,
  ListTask,
  ListTaskInput,
  UpdateTask,
} from "../use-cases/task";

export default class TaskController {
  constructor(
    private readonly createTask: CreateTask,
    private readonly updateTask: UpdateTask,
    private readonly deleteTask: DeleteTask,
    private readonly listTask: ListTask,
    private readonly completeTask: CompleteTask
  ) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { title, description, page, size } = req.query;

      const listTaskInput: ListTaskInput = {
        searchFields: {
          description: description?.toString() ?? undefined,
          title: title?.toString() ?? undefined,
        },
        pagination: {
          page: !!page ? Number(page) : undefined,
          size: !!size ? Number(size) : undefined,
        },
      };

      const result = await this.listTask.execute(listTaskInput);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

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

  complete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;

      if (!id) throw new Error("id is null or undefined");

      const result = await this.completeTask.execute(id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
