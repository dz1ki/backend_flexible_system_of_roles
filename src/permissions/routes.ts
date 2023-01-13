import * as express from "express";
import { PERMISSION_ACTION_READ } from "../data/constants";
import { authMiddleware } from "../middlewares/auth.middeleware";
import { checkRoleMiddleware } from "../middlewares/role.middeleware";
import { findPermissions } from "./controller";
import { ENTITY_NAME_PERMISSION } from "./constants";

export const permission: express.IRouter = express.Router();
permission.get(
  "/list",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_READ, ENTITY_NAME_PERMISSION),
  findPermissions
);
