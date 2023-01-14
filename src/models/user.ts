import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

import { sequelize } from "./index";
import { Role } from "./role";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare emailConfirmed: boolean;
  declare isSystem: boolean;
  declare roles?: NonAttribute<Role[]>;
  declare mailConfirmationCode: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    password: {
      type: new DataTypes.STRING(),
      allowNull: true,
    },
    firstName: {
      type: new DataTypes.STRING(),
      field: "first_name",
    },
    lastName: {
      type: new DataTypes.STRING(),
      field: "last_name",
    },
    email: {
      type: new DataTypes.STRING(),
      allowNull: true,
    },
    emailConfirmed: {
      type: new DataTypes.BOOLEAN(),
      field: "email_confirmed",
    },
    mailConfirmationCode: {
      type: new DataTypes.STRING(),
      allowNull: false,
      field: "mail_confirmation_code",
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
    sequelize,
    tableName: "users",
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
