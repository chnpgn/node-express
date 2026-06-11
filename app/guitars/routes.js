import { Router } from "express";
import { listGuitars, showGuitar, showCreateForm, createGuitar, editGuitar, saveGuitar, deleteGuitar } from "./controller.js";

export const routes = Router();

routes.get("/", listGuitars);
routes.post("/", createGuitar);
routes.get("/create", showCreateForm);
routes.get("/:id", showGuitar);
routes.get("/:id/edit", editGuitar);
routes.get("/:id/delete", deleteGuitar);
routes.post("/:id", saveGuitar);