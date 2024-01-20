import { Router } from "express";
import UserController from "../controllers/user-controller";
import PgUserRepository from "../../infra/pg/repositories/pg-user-repository";
import { makeCreateUser } from "../factories/user/index";

const userRouter = Router();

const userRepository = new PgUserRepository();

const createUser = makeCreateUser(userRepository);
const userController = new UserController(createUser);

userRouter.post("/", userController.create);

export default userRouter;
