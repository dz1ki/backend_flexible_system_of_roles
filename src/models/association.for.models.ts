import { PermissionObject } from "./object.permission";
import { Permission } from "./permission";
import { Role } from "./role";
import { User } from "./user";

User.belongsToMany(Role, {
  through: "users_roles",
  foreignKey: "user_id",
  as: "roles",
  sourceKey: "id",
});

Role.belongsToMany(User, {
  through: "users_roles",
  foreignKey: "role_id",
  as: "users",
  sourceKey: "id",
});

Role.belongsToMany(Permission, {
  through: "roles_permissions",
  foreignKey: "role_id",
  as: "permissions",
  sourceKey: "id",
});
Permission.belongsToMany(Role, {
  through: "roles_permissions",
  foreignKey: "permission_id",
  as: "roles",
  sourceKey: "id",
});

PermissionObject.hasMany(Permission, {
  foreignKey: "id",
  as: "permissions",
});
Permission.belongsTo(PermissionObject, {
  foreignKey: "object_id",
  as: "permissionObject",
});
