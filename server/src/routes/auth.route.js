import { Router } from "express";
import { createUser } from "../controllers/auth.controllers.js";

const route = Router();

route.post("/create-user", createUser);

export default route;
