import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from ".";
import { Permission } from "./permission";

export class Role extends Model<
  InferAttributes<Role>,
  InferCreationAttributes<Role>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare slugname: string;
  declare isSystem: boolean;
  declare users?: NonAttribute<Role[]>;
  declare permissions?: NonAttribute<Permission[]>;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

Role.init(
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
    tableName: "roles",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
