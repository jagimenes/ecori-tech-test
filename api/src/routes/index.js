const { Router } = require("express");

const userRoutes = require("./user.routes");
const taskRoutes = require("./task.routes");
const sessionsRoutes = require("./session.routes");

const routes = Router();

routes.use('/users', userRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/', taskRoutes);


module.exports = routes;