import * as express from "express";
import { permission } from "./permissions/routes";
import { role } from "./roles/router";
import { user } from "./users/routes";

export const router: express.IRouter = express.Router();
router.use("/user", user);
router.use("/role", role);
router.use("/permission", permission);
