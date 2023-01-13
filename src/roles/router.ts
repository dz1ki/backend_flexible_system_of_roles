import * as express from "express";
import {
  PERMISSION_ACTION_CREATE,
  PERMISSION_ACTION_DELETE,
  PERMISSION_ACTION_READ,
  PERMISSION_ACTION_UPDATE,
} from "../data/constants";
import { authMiddleware } from "../middlewares/auth.middeleware";
import { checkRoleMiddleware } from "../middlewares/role.middeleware";
import { ENTITY_NAME_ROLE } from "./constants";
import {
  createRole,
  deleteRole,
  findRole,
  updateRole,
  addPermission,
  dropPermission,
} from "./controller";

export const role: express.IRouter = express.Router();
role.post(
  "/create",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_CREATE, ENTITY_NAME_ROLE),
  createRole
);
role.patch(
  "/update",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_UPDATE, ENTITY_NAME_ROLE),
  updateRole
);
role.get(
  "/find",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_READ, ENTITY_NAME_ROLE),
  findRole
);
role.delete(
  "/delete",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_DELETE, ENTITY_NAME_ROLE),
  deleteRole
);

role.patch(
  "/add_permission",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_UPDATE, ENTITY_NAME_ROLE),
  addPermission
);

role.patch(
  "/drop_permission",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_UPDATE, ENTITY_NAME_ROLE),
  dropPermission
);
