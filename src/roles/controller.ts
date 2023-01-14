import {
  AddPermissionRoleDTO,
  AddRoleDTO,
  DeleteRoleDTO,
  DropPermissionRoleDTO,
  FindUserDTO,
  UpdateRoleDTO,
} from "../types/role";
import * as express from "express";
import {
  addPermissionRole,
  addRole,
  dropPermissionRole,
  dropRole,
  listRole,
  updateOneRole,
} from "./service";

export async function createRole(req: AddRoleDTO, res: express.Response) {
  try {
    const { name } = req.body;
    const result = await addRole(name);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function updateRole(req: UpdateRoleDTO, res: express.Response) {
  try {
    const { id, name } = req.body.name;
    const result = await updateOneRole(id, name);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function findRole(req: FindUserDTO, res) {
  try {
    const permissionObjUser = req.userPermission;
    const result = await listRole(permissionObjUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function deleteRole(req: DeleteRoleDTO, res: express.Response) {
  try {
    const { id } = req.body.name;
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
    const { permissionId, roleId } = req.body.permissions;
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
    const { permissionId, roleId } = req.body.permissions;
    const result = await dropPermissionRole(permissionId, roleId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}
