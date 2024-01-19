import { NextFunction, Request, Response, response } from "express";
import jwt from "jsonwebtoken";
import PgUserRepository from "../../infra/pg/repositories/pg-user-repository";
import { NotAuthenticatedError } from "../exception/not-authenticated-error";
const { SECRET } = process.env;
type UserFromToken = { id: string };

export default async function authenticationHandler(
  request: Request,
  resopnse: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = request.header("Authorization");
    const token = authorizationHeader?.replace("Bearer ", "") ?? undefined;

    if (!token) throw new NotAuthenticatedError("invalid token");

    let user = jwt.verify(token, SECRET as string) as UserFromToken;

    const userRepository = new PgUserRepository();
    user = await userRepository.findById(user.id);

    if (!user) throw new NotAuthenticatedError("not authenticated user ");

    next();
  } catch (error) {
    next(error);
  }
}
