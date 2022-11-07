import {
  AuthorizationDTO,
  checkEmailDTO,
  RegistrationDTO,
  UpdatePasswordDTO,
} from "../types/user";
import {
  authorizationUser,
  checkEmailUser,
  list,
  registrationUser,
  updatePasswordUser,
} from "./service";

export async function listUser(req, res) {
  try {
    const data = await list();
    res.status(200).json(data);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message || "Server error" });
  }
}

export async function registration(req: RegistrationDTO, res) {
  try {
    const { userEmail, firstName, lastName, password } = req.body;
    const result = await registrationUser(
      userEmail,
      firstName,
      lastName,
      password
    );
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message || "Server error" });
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

export async function authorization(req: AuthorizationDTO, res) {
  try {
    const { email, password } = req.body;
    const result = await authorizationUser(email, password);
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message || "Server error" });
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
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message || "Server error" });
  }
}
