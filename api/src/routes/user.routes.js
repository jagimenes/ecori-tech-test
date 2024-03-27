const { Router } = require("express");

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated");

const userRoutes = Router();
const userController = new UsersController();

userRoutes.post("/", userController.create);

module.exports = userRoutes;