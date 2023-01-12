import { Permission } from "../models/permission";
import { Role } from "../models/role";
import { AddRoleDTO } from "../types/role";
import {
  addPermissionRole,
  addRole,
  dropPermissionRole,
  dropRole,
  updateOneRole,
} from "./service";

export async function createRole(req: AddRoleDTO, res) {
  try {
    const { name } = req.body;
    const result = await addRole(name);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function updateRole(req, res) {
  try {
    const { id, name } = req.body.name;
    const result = await updateOneRole(id, name);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function findRole(req, res) {
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

export async function deleteRole(req, res) {
  try {
    const { id } = req.body;
    const result = await dropRole(id);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function addPermission(req, res) {
  try {
    const { permissionId, roleId } = req.body.permission;
    const result = await addPermissionRole(permissionId, roleId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function dropPermission(req, res) {
  try {
    const { permissionId, roleId } = req.body.permission;
    const result = await dropPermissionRole(permissionId, roleId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}
