import { Router } from "express";
import AuthenticateUserController from "../controllers/authenticate-user-controller";
import PgUserRepository from "../../infra/pg/repositories/pg-user-repository";
import { makeAuthenticateUser } from "../factories/user";

const authenticateUserRouter = Router();

const userRepository = new PgUserRepository();

const authenticateUser = makeAuthenticateUser(userRepository);
const authenticateUserController = new AuthenticateUserController(
  authenticateUser
);

authenticateUserRouter.post("/", authenticateUserController.create);

export default authenticateUserRouter;
