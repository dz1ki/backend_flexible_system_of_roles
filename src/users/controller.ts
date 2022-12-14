import { User } from "../models/user";
import {
  AuthorizationDTO,
  checkEmailDTO,
  DropUserDto,
  ListUserDTO,
  RegistrationDTO,
  UpdatePasswordDTO,
  UpdateUserDTO,
} from "../types/user";
import {
  authorizationUser,
  checkEmailUser,
  registrationUser,
  updatePasswordUser,
  updateUserData,
} from "./service";

export async function registration(req: RegistrationDTO, res) {
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

export async function authorization(req: AuthorizationDTO, res) {
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
    const { email } = req.user;
    const { newEmail, firstName, lastName } = req.body;
    const result = await updateUserData(email, newEmail, firstName, lastName);
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function findUser(req: ListUserDTO, res) {
  try {
    const { email } = req.user;
    const result = await User.findOne({ where: { email } });
    res.status(200).json(result);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function dropUser(req: DropUserDto, res) {
  try {
    const { email } = req.user;
    await User.destroy({ where: { email } });
    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function updatePassword(req: UpdatePasswordDTO, res) {
  try {
    const { email } = req.user;
    const { oldPassword, newPassword, repeatNewPassword } = req.body;
    const result = await updatePasswordUser(
      oldPassword,
      newPassword,
      repeatNewPassword,
      email
    );
    res.status(result.statusCode || 200).json(result.message);
  } catch (error) {
    res.status(error.statusCode || 500).json(error.message || "Server error");
  }
}

export async function checkEmail(req: checkEmailDTO, res) {
  try {
    const { email, code } = req.body;
    const result = await checkEmailUser(email, code);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message || "Server error" });
  }
}

export async function emailConfirmed(req, res) {
  try {
    res.status(200).json({ message: "Your email has been verified" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message || "Server error" });
  }
}
