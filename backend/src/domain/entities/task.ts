import generateUUID from "../../lib/uuid/identifier-generator.js";
import { AppError } from "../../application/exception/app-error.js";

export class Task {
  id: string;
  title: string;
  description: string;
  created_at?: Date;
  completed_at?: Date | null;
  updated_at?: Date | null;

  private constructor({
    id,
    title,
    description,
    created_at,
    completed_at,
    updated_at,
  }: Task) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.created_at = created_at;
    this.completed_at = completed_at;
    this.updated_at = updated_at;
  }

  static create({
    id,
    title,
    description,
    created_at,
    completed_at,
    updated_at,
  }: Partial<Task>) {
    if (title === null) throw new AppError("title is null");
    if (title === undefined) throw new AppError("title is undefined");

    if (description === null) throw new AppError("title is null");
    if (description === undefined) throw new AppError("title is undefined");

    return new Task({
      title,
      description,
      id: id || generateUUID(),
      created_at,
      completed_at,
      updated_at,
    });
  }
}
