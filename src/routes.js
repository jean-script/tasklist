import { Router } from "express";
import UserController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";

import authMiddleware from "./app/middlewares/auth";

const routes = new Router();

routes.post("/users", UserController.store);
routes.post("/sessions", SessionController.store);

// com isso todas as rotas que estão a baixo vão precisar se autenticar
routes.use(authMiddleware);

routes.put("/users", UserController.update);

export default routes;
