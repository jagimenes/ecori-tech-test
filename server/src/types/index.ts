import { Request, Response } from "express";

export interface ITasksController {
  getAllTasks(req: Request, res: Response): Promise<void>;
  getTaskById(req: Request, res: Response): Promise<void>;
  createNewTask(req: Request, res: Response): Promise<void>;
  updateTask(req: Request, res: Response): Promise<void>;
  deleteTask(req: Request, res: Response): Promise<void>;
  taskCompleted(req: Request, res: Response): Promise<void>;
  taskUpload(req: Request, res: Response): Promise<void>;
}

export interface ITaskService {
  getAllTasks({
    titleFilters,
    descriptionFilters,
    page,
    pageSize,
  }: GetAll): Promise<Task[]>;
  getTaskById(taskId: string): Promise<Task>;
  createNewTask({ title, description }: TaskPayload): Promise<Task>;
  updateTask({ taskId, title, description }: TaskPayload): Promise<Task>;
  deleteTask(taskId: string): Promise<Task>;
  completeTask(taskId: string): Promise<{ message: string }>;
  taskUpload(filePath: string): Promise<void>;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  completed: boolean;
}

export interface TaskPayload {
  taskId?: string;
  title: string;
  description: string;
}

export interface GetAll {
  titleFilters: string;
  descriptionFilters: string;
  page: number;
  pageSize: number;
}

export interface ItaskUpload {
  title: string;
  description: string;
}

export type queryValues = (string | number)[];
