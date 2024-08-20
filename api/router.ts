import { Router } from "express";
import * as handlers from "./handlers";
import exp from "express";
const routes = exp.Router();

// routes.get("/auth/user", handlers.getUser);
// routes.post("/auth/login", handlers.login);
console.log("here in route");
routes.post("/user/signup", handlers.signup);

export default routes;
