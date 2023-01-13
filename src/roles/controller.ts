import { Permission } from "../models/permission";
import { Role } from "../models/role";
import {
  AddPermissionRoleDTO,
  AddRoleDTO,
  DeleteRoleDTO,
  DropPermissionRoleDTO,
  UpdateRoleDTO,
} from "../types/role";
import * as express from "express";
import {
  addPermissionRole,
  addRole,
  dropPermissionRole,
  dropRole,
  updateOneRole,
} from "./service";

export async function createRole(req: AddRoleDTO, res: express.Response) {
  try {
    const { role } = req.body;
    const result = await addRole(role);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function updateRole(req: UpdateRoleDTO, res: express.Response) {
  try {
    const { id, name } = req.body.role;
    const result = await updateOneRole(id, name);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function findRole(req: express.Request, res: express.Response) {
  try {
    const result = await Role.findAll({
      attributes: ["name"],
      include: [
        {
          model: Permission,
          through: { attributes: [] },
          as: "permissions",
          attributes: ["name"],
        },
      ],
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function deleteRole(req: DeleteRoleDTO, res: express.Response) {
  try {
    const { id } = req.body.role;
    const result = await dropRole(id);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function addPermission(
  req: AddPermissionRoleDTO,
  res: express.Response
) {
  try {
    const { permissionId, roleId } = req.body.permission;
    const result = await addPermissionRole(permissionId, roleId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function dropPermission(
  req: DropPermissionRoleDTO,
  res: express.Response
) {
  try {
    const { permissionId, roleId } = req.body.permission;
    const result = await dropPermissionRole(permissionId, roleId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}
