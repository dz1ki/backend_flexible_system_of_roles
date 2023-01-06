import * as express from "express";
import { authMiddleware } from "../middlewares/auth.middeleware";
import { checkRoleMiddleware } from "../middlewares/role.middeleware";
import {
  authorization,
  checkEmail,
  findUser,
  registration,
  updatePassword,
  updateUser,
  dropUser,
  findAllUser,
  roleDrop,
  roleAdd,
} from "./controller";

const PERMISSION_ACTION_CREATE = "Create";
const PERMISSION_ACTION_UPDATE = "Update";
const PERMISSION_ACTION_READ = "Read";
const PERMISSION_ACTION_DELETE = "Delete";

const ENTITY_NAME_USER = "users";

export const user: express.IRouter = express.Router();
user.post("/registration", registration);
user.post("/authorization", authorization);
user.patch("/update", authMiddleware, updateUser);
user.get("/find", authMiddleware, findUser);
user.delete("/drop", authMiddleware, dropUser);
user.put("/update-password", authMiddleware, updatePassword);
user.post("/check-email", checkEmail);
user.get(
  "/list",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_READ, ENTITY_NAME_USER),
  findAllUser
);

user.patch(
  "/add_role",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_UPDATE, ENTITY_NAME_USER),
  roleAdd
);

user.patch(
  "/drop_role",
  authMiddleware,
  checkRoleMiddleware(PERMISSION_ACTION_UPDATE, ENTITY_NAME_USER),
  roleDrop
);
