import { Router } from "express";
import { showLogin, authenticateUser, logoutUser } from "./controller.js";

export const routes = Router();

routes.get("/login",  showLogin );
routes.post("/login", authenticateUser ); // Add login handler here
routes.get("/logout", logoutUser ); // Add logout handler here