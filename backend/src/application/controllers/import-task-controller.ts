import { NextFunction, Request, Response } from "express";
import { parse } from "csv-parse";
import fs from "fs";
import { CreateTask } from "../use-cases/task";

export default class ImportTaskController {
  constructor(private readonly createTask: CreateTask) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = (req as any).file;
      if (!file) {
        res.status(400).send("No file uploaded");
        return;
      }

      fs.createReadStream(file.path)
        .pipe(parse({ delimiter: ",", from_line: 2 }))
        .on("data", async ([title, description]) => {
          await this.createTask.execute({ title, description });
        })
        .on("end", function () {
          fs.unlinkSync(file.path);
          res.status(200).send("csv import finished");
        })
        .on("error", function () {
          fs.unlinkSync(file.path);
          res.status(500).send("error while importing csv file");
        });
    } catch (error) {
      next(error);
    }
  };
}
