import { Role } from "../models/role";
import { AddRoleDTO, UpdateRoleDTO } from "../types/role";
import { addRole, dropRole, updateOneRole } from "./service";

export async function createRole(req: AddRoleDTO, res) {
  try {
    const { newRole } = req.body;
    const result = await addRole(newRole);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function updateRole(req: UpdateRoleDTO, res) {
  try {
    const { idRole, newName } = req.body;
    const result = await updateOneRole(idRole, newName);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function findRole(req, res) {
  try {
    const result = await Role.findAll();
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function deleteRole(req, res) {
  try {
    const { idRole } = req.body;
    const result = await dropRole(idRole);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function addRoleUser(req, res) {
  try {
    // res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}
