import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from "./index";
import { PermissionObject } from "./object.permission";
import { Role } from "./role";

enum PermissionAction {
  Create = "Create",
  Delete = "Delete",
  Read = "Read",
  Update = "Update",
}

export class Permission extends Model<
  InferAttributes<Permission>,
  InferCreationAttributes<Permission>
> {
  declare id: CreationOptional<number>;
  declare objectId: ForeignKey<PermissionObject["id"]>;
  declare name: string;
  declare roles?: NonAttribute<Role[]>;
  declare permissionObject?: NonAttribute<PermissionObject[]>;
  declare action: PermissionAction;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}
Permission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    objectId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      field: "object_id",
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    action: {
      type: new DataTypes.ENUM(),
      values: ["Read", "Create", "Update", "Delete"],
      allowNull: false,
    },

    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    tableName: "permissions",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
