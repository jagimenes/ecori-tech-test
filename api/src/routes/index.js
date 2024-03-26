const { Router } = require("express");

const taskRoutes = require("./task.routes");

const routes = Router();

routes.use('/', taskRoutes);


module.exports = routes;