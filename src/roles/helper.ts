import { Role } from "../models/role";
import { RolePermission } from "../models/role.permission";

export async function checkUniqueRole(newRole: string) {
  const role = await Role.findOne({ where: { name: newRole } });
  if (role) {
    throw { message: "This role already exists.", statusCode: 400 };
  }
}

export function checkSymbol(name: string) {
  const result = RegExp(/[^a-zа-яёA-ZА-ЯЁ\s]/gi, "").test(name);
  if (result) {
    throw { message: "Name must not contain characters.", statusCode: 400 };
  }
}

export async function checkIsSystemRole(idRole: number) {
  const role = await Role.findOne({ where: { id: idRole } });
  if (role.isSystem) {
    throw { message: "This is a system role.", statusCode: 400 };
  }
}

export async function checkRole(idRole: number) {
  const role = await Role.findOne({ where: { id: idRole } });
  if (!role) {
    throw { message: "No such role exists.", statusCode: 404 };
  }
}

export async function checkUniquRolePermission(
  permissionId: number,
  roleId: number
) {
  const result = await RolePermission.findOne({
    where: { permissionId, roleId },
  });
  if (result) {
    throw { message: "The role already has this permission", statusCode: 400 };
  }
}

export async function checkIsSustemPermissionRole(
  permissionId: number,
  roleId: number
) {
  const result = await RolePermission.findOne({
    where: { permissionId, roleId },
  });
  if (result.isSystem) {
    throw { message: "Not possible to remove", statusCode: 400 };
  }
}
export async function checkRolePermission(
  permissionId: number,
  roleId: number
) {
  const result = await RolePermission.findOne({
    where: { permissionId, roleId },
  });
  if (!result) {
    throw { message: "Role or permission not found", statusCode: 404 };
  }
}
