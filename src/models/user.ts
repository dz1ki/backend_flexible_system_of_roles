import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import { sequelize } from ".";
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
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    firstName: {
      type: new DataTypes.STRING(128),
      field: "first_name",
    },
    lastName: {
      type: new DataTypes.STRING(128),
      field: "last_name",
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
    emailConfirmed: {
      type: new DataTypes.BOOLEAN(),
      field: "email_confirmed",
    },
    mailConfirmationCode: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      field: "mail_confirmation_code",
    },

    isSystem: {
      type: new DataTypes.BOOLEAN(),
      field: "is_system",
    },
    created_at: DataTypes.DATE,
    updated_at: DataTypes.DATE,
  },
  {
    tableName: "users",
    sequelize,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);
