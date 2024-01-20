import { Request, Response, NextFunction } from "express";
import CreateUser from "../use-cases/user/create-user";

export default class UserController {
  constructor(private readonly createUser: CreateUser) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, email, password, passwordConfirmation } = req.body;

      const result = await this.createUser.execute({
        username,
        email,
        password,
        passwordConfirmation,
      });

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };
}
