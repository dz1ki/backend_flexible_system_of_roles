import { Permission } from "../models/permission";
import * as express from "express";

export async function findPermissions(
  req: express.Request,
  res: express.Response
) {
  try {
    const result = await Permission.findAll({ attributes: ["name", "id"] });
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}
