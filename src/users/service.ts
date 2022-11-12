import { sendToEmail } from "../mailer/mailer";
import { User } from "../models/user";
import {
  generateJwt,
  hashPassword,
  parsePassword,
  randomCharacterGenerator,
} from "./helper";

export async function list() {
  return await User.findAll({});
}

export async function registrationUser(
  userEmail: string,
  firstName: string,
  lastName: string,
  passwordUser: string
) {
  const mailConfirmationCode = randomCharacterGenerator();
  const findUser = await User.findOne({ where: { email: userEmail } });
  if (findUser) {
    throw { message: "User with this email already exists" };
  }
  const resultHash = await hashPassword(passwordUser);
  await User.create({
    email: userEmail,
    firstName,
    lastName,
    mailConfirmationCode,
    password: resultHash,
  });
  await sendToEmail(userEmail, mailConfirmationCode);
  return {
    message: `User registered. A confirmation email has been sent to ${userEmail}`,
  };
}

export async function checkEmailUser(
  emailUser: string,
  codeConfirmation: string
) {
  const user = await User.findOne({ where: { email: emailUser } });
  if (codeConfirmation === user.mailConfirmationCode) {
    await User.update({ emailConfirmed: true }, { where: { id: user.id } });
    return { message: "Email confirmed" };
  }
  return { message: "Mail not confirmed." };
}

export async function authorizationUser(emailUser: string, password: string) {
  const findUser = await User.findOne({ where: { email: emailUser } });
  if (!findUser) {
    throw { message: "No such user exists" };
  }
  const resultParse = await parsePassword(password, findUser.password);
  if (!resultParse) {
    throw { message: "Wrong password" };
  }
  const token = generateJwt(findUser.id, findUser.email);
  return { message: "User is authorized", token };
}

export async function updatePasswordUser(
  oldPassword: string,
  newPassword: string,
  repeatNewPassword: string,
  userEmail: string
) {
  if (!(newPassword === repeatNewPassword)) {
    throw { message: "New passwords do not match" };
  }
  const oneUser = await User.findOne({ where: { email: userEmail } });
  const resultParse = await parsePassword(oldPassword, oneUser.password);
  if (!resultParse) {
    throw { message: "Wrong password" };
  }
  const hashNewPassword = await hashPassword(newPassword);
  await User.update(
    { password: hashNewPassword },
    { where: { email: userEmail } }
  );
  return { message: "Password changed successfully." };
}
