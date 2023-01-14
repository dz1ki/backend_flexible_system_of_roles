import { User } from "../models/user";
import {
  AddUserRoleDTO,
  AuthorizationDTO,
  checkEmailDTO,
  DeleteUserRoleDTO,
  DropUserDto,
  FindAllUsersDTO,
  ListUserDTO,
  RegistrationDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
} from "../types/user";
import * as express from "express";
import { checkIsSystem } from "./helper";
import {
  addRoleUser,
  authorizationUser,
  checkEmailUser,
  dropRoleUser,
  listUsers,
  registrationUser,
  updatePasswordUser,
  updateUserData,
} from "./service";

export async function registration(
  req: RegistrationDTO,
  res: express.Response
) {
  try {
    const { userEmail, firstName, lastName, password } = req.body;
    const result = await registrationUser(
      userEmail,
      firstName,
      lastName,
      password
    );
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function authorization(
  req: AuthorizationDTO,
  res: express.Response
) {
  try {
    const { email, password } = req.body;
    const result = await authorizationUser(email, password);
    res
      .status(result.statusCode || 200)
      .json({ message: result.message, token: result.token });
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function updateUser(req: UpdateUserDTO, res) {
  try {
    const { id } = req.user;
    const { newEmail, firstName, lastName } = req.body;
    const result = await updateUserData(id, newEmail, firstName, lastName);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function findUser(req: ListUserDTO, res) {
  try {
    const { id } = req.user;
    const result = await User.findOne({
      where: { id },
      include: { all: true, nested: true },
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function dropUser(req: DropUserDto, res) {
  try {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });
    checkIsSystem(user.isSystem);
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function updatePassword(req: UpdatePasswordDTO, res) {
  try {
    const { id } = req.user;
    const { oldPassword, newPassword, repeatNewPassword } = req.body;
    const result = await updatePasswordUser(
      oldPassword,
      newPassword,
      repeatNewPassword,
      id
    );
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function checkEmail(req: checkEmailDTO, res: express.Response) {
  try {
    const { userId, code } = req.body;
    const result = await checkEmailUser(userId, code);
    res.status(result.statusCode || 200).json(result.message);
  } catch (e) {
    res.status(500).send({ message: e.message || "Server error" });
  }
}

export async function findAllUser(req: FindAllUsersDTO, res) {
  try {
    const permissionObjUser = req.userPermission;
    const result = await listUsers(permissionObjUser);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function roleAdd(req: AddUserRoleDTO, res: express.Response) {
  try {
    const { roleId, userId } = req.body.roles;
    const result = await addRoleUser(roleId, userId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (e) {
    res.status(500).send({ message: e.message || "Server error" });
  }
}

export async function roleDrop(req: DeleteUserRoleDTO, res: express.Response) {
  try {
    const { roleId, userId } = req.body.roles;
    const result = await dropRoleUser(roleId, userId);
    res.status(result.statusCode || 200).json(result.message);
  } catch (e) {
    res.status(500).send({ message: e.message || "Server error" });
  }
}
