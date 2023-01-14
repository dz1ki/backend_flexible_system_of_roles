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
  declare isSystem: boolean;
  declare users?: NonAttribute<Role[]>;
  declare permissions?: NonAttribute<Permission[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Role.init(
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

    isSystem: {
      type: new DataTypes.BOOLEAN(),
      field: "is_system",
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
    tableName: "roles",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
