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
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
PermissionObject.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },
    slugname: {
      type: new DataTypes.STRING(),
      allowNull: false,
    },

    createdAt: {
      type: new DataTypes.DATE(),
      field: "created_at",
    },
    updatedAt: {
      type: new DataTypes.DATE(),
      field: "created_at",
    },
  },
  {
    tableName: "permission_objects",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
