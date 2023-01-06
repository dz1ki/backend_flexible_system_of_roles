import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "./index";

export class PermissionObject extends Model<
  InferAttributes<PermissionObject>,
  InferCreationAttributes<PermissionObject>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slugname: string;
  declare isSystem: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}
PermissionObject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    slugname: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    isSystem: {
      type: new DataTypes.BOOLEAN(),
      field: "is_system",
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    tableName: "permission_objects",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
