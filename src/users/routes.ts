import * as express from "express";
import { authMiddleware } from "../middlewares/auth.middeleware";
import {
  authorization,
  checkEmail,
  findUser,
  registration,
  updatePassword,
  updateUser,
  dropUser,
} from "./controller";

export const user: express.IRouter = express.Router();
user.post("/registration", registration);
user.post("/authorization", authorization);
user.patch("/update", authMiddleware, updateUser);
user.get("/find", authMiddleware, findUser);
user.delete("/drop", authMiddleware, dropUser);
user.put("/update-password", authMiddleware, updatePassword);
user.post("/check-email", checkEmail);
