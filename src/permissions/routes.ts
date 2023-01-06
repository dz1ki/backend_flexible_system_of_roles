import * as express from "express";
import { authMiddleware } from "../middlewares/auth.middeleware";
import { checkRoleMiddleware } from "../middlewares/role.middeleware";
import { findPermissions } from "./controller";

const PERMISSION_ACTION_CREATE = "Create";
const PERMISSION_ACTION_UPDATE = "Update";
const PERMISSION_ACTION_READ = "Read";
const PERMISSION_ACTION_DELETE = "Delete";
const ENTITY_NAME_PERMISSION = "permissions";

export const permission: express.IRouter = express.Router();
permission.get(
  "/list",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_READ, ENTITY_NAME_PERMISSION),
  findPermissions
);
