import { Router } from "express";
import { checkAuth } from "../auth/controller.js";
import { listGuitars, showGuitar, showCreateForm, createGuitar, editGuitar, saveGuitar, deleteGuitar } from "./controller.js";

export const routes = Router();

const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
};

routes.use(logRequest);

routes.get("/", listGuitars);
routes.post("/", checkAuth, createGuitar);
routes.get("/create", showCreateForm);
routes.get("/:id", showGuitar);
routes.get("/:id/edit", checkAuth, editGuitar);
routes.get("/:id/delete", checkAuth, deleteGuitar);
routes.post("/:id", checkAuth, saveGuitar);