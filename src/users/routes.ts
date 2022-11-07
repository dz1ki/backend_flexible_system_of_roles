import * as express from "express";
import { authMiddleware } from "../middlewares/auth.middeleware";
import {
  authorization,
  checkEmail,
  emailConfirmed,
  listUser,
  registration,
  updatePassword,
} from "./controller";

export const users: express.IRouter = express.Router();
users.get("/list", authMiddleware, listUser);
users.post("/registration", registration);
users.post("/check-email", checkEmail);
users.get("/email-confirmed", emailConfirmed);
users.post("/authorization", authorization);
users.patch("/update-password", authMiddleware, updatePassword);
