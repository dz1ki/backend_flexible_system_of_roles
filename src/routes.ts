import * as express from "express";
import { users } from "./users/routes";

export const router: express.IRouter = express.Router();
router.use("/users", users);
