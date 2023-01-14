import { Permission } from "../models/permission";
import * as express from "express";

export async function findPermissions(req, res: express.Response) {
  try {
    const permissionObjUser = req.userPermission;
    permissionObjUser.push("id");
    const result = await Permission.findAll({ attributes: permissionObjUser });
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}
