import { Role } from "../models/role";
import { User } from "../models/user";
import { Permission } from "../models/permission";
import { PermissionObject } from "../models/object.permission";

export async function findPirmission(userId: number, action: string) {
  return await User.findAll({
    attributes: [],
    where: { id: userId },
    include: [
      {
        model: Role,
        through: { attributes: [] },
        as: "roles",
        attributes: [],
        include: [
          {
            model: Permission,
            through: { attributes: [] },
            as: "permissions",
            attributes: [],
            where: { action: action },
            include: [
              {
                model: PermissionObject,
                as: "permissionObject",
                attributes: ["slugname"],
              },
            ],
          },
        ],
      },
    ],
    raw: true,
    nest: true,
  });
}

export function transformPermissionToArray(resultUserPermission) {
  const result = [];
  resultUserPermission.forEach((users) => {
    result.push(users.roles.permissions.permissionObject.slugname);
  });
  return result;
}

export function checkFullPermissionEntity(arrayPermissions, entity) {
  return arrayPermissions.includes(entity);
}
