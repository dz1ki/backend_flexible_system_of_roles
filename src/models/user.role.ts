import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from ".";
import { Role } from "./role";
import { User } from "./user";

export class UserRole extends Model<
  InferAttributes<UserRole>,
  InferCreationAttributes<UserRole>
> {
  declare id: CreationOptional<number>;
  declare roleId: ForeignKey<Role["id"]>;
  declare userId: ForeignKey<User["id"]>;
  declare isSystem: boolean;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}
UserRole.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      field: "role_id",
    },
    userId: {
      type: new DataTypes.INTEGER(),
      allowNull: false,
      field: "user_id",
    },
    isSystem: {
      type: new DataTypes.BOOLEAN(),
      field: "is_system",
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    tableName: "users_roles",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
