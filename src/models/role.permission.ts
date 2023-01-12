import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "./index";
import { Permission } from "./permission";
import { Role } from "./role";

export class RolePermission extends Model<
  InferAttributes<RolePermission>,
  InferCreationAttributes<RolePermission>
> {
  declare id: CreationOptional<number>;
  declare roleId: ForeignKey<Role["id"]>;
  declare permissionId: ForeignKey<Permission["id"]>;
  declare isSystem: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    roleId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      field: "role_id",
    },
    permissionId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      field: "permission_id",
    },
    isSystem: {
      type: new DataTypes.BOOLEAN(),
      field: "is_system",
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },

  {
    tableName: "roles_permissions",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
