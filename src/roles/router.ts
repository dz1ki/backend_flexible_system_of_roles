import * as express from "express";
import { authMiddleware } from "../middlewares/auth.middeleware";
import { roleMiddleware } from "../middlewares/role.middeleware";
import { createRole, deleteRole, findRole, updateRole } from "./controller";

export const role: express.IRouter = express.Router();
role.post("/create", authMiddleware, roleMiddleware, createRole);
role.put("/update", authMiddleware, roleMiddleware, updateRole);
role.get("/find", authMiddleware, roleMiddleware, findRole);
role.delete("/delete", authMiddleware, roleMiddleware, deleteRole);
