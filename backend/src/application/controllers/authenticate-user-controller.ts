import { Request, Response, NextFunction } from "express";
import CreateUser from "../use-cases/user/create-user";
import AuthenticateUser from "../use-cases/user/authenticate-user";

export default class AuthenticateUserController {
  constructor(private readonly authenticateUser: AuthenticateUser) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const result = await this.authenticateUser.execute({
        email,
        password,
      });

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}
