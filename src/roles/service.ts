import { Role } from "../models/role";
import {
  checkIsSustemPermissionRole,
  checkIsSustemRole,
  checkRole,
  checkRolePermission,
  checkSymbol,
  checkUniqueRole,
  checkUniquRolePermission,
} from "./helper";
import { RolePermission } from "../models/role.permission";

export async function addRole(newRole: string) {
  checkSymbol(newRole);
  await checkUniqueRole(newRole);
  await Role.create({
    name: newRole,
  });
  return { message: "Role saved successfully.", statusCode: 201 };
}

export async function updateOneRole(idRole: number, newName: string) {
  checkSymbol(newName);
  await checkUniqueRole(newName);
  await checkIsSustemRole(idRole);
  await Role.update({ name: newName }, { where: { id: idRole } });
  return { message: "Role successfully updated.", statusCode: 200 };
}

export async function dropRole(idRole: number) {
  await checkRole(idRole);
  await checkIsSustemRole(idRole);
  await Role.destroy({ where: { id: idRole } });
  return { message: "Role deleted successfully", statusCode: 200 };
}

export async function addPermissionRole(permissionId, roleId) {
  await checkUniquRolePermission(permissionId, roleId);
  await RolePermission.create({ permissionId, roleId });
  return { message: "Permission added successfully to role", statusCode: 200 };
}

export async function dropPermissionRole(permissionId: number, roleId: number) {
  await checkRolePermission(permissionId, roleId);
  await checkIsSustemPermissionRole(permissionId, roleId);
  await RolePermission.destroy({ where: { permissionId, roleId } });
  return {
    message: "Permission successfully removed at role",
    statusCode: 200,
  };
}
