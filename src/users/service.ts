import { sendToEmailConfirmation } from "../mailer/mailer";
import { User } from "../models/user";
import {
  checkPasswordUser,
  checkUniqueEmail,
  checkUser,
  generateJwt,
  hashPassword,
  parsePassword,
  randomCharacterGenerator,
} from "./helper";

export async function registrationUser(
  userEmail: string,
  firstName: string,
  lastName: string,
  passwordUser: string
) {
  const findUser = await User.findOne({ where: { email: userEmail } });
  checkUniqueEmail(findUser);
  const resultHash = await hashPassword(passwordUser);
  const mailConfirmationCode = randomCharacterGenerator();
  const user = await User.create({
    email: userEmail,
    firstName,
    lastName,
    mailConfirmationCode,
    password: resultHash,
  });

  await sendToEmailConfirmation(user.id, userEmail, mailConfirmationCode);
  return {
    message: `User registered. A confirmation email has been sent to ${userEmail}`,
    statusCode: 201,
  };
}

export async function authorizationUser(emailUser: string, password: string) {
  const findUser = await User.findOne({ where: { email: emailUser } });
  checkUser(findUser);
  const resultParse = await parsePassword(password, findUser.password);
  checkPasswordUser(resultParse);
  const token = generateJwt(findUser.id, findUser.email);
  return { message: "User is authorized", token, statusCode: 201 };
}

export async function updateUserData(
  userId: number,
  newEmail: string,
  firstName: string,
  lastName: string
) {
  let dataSave = {};
  if (newEmail) {
    const findUser = await User.findOne({ where: { email: newEmail } });
    checkUniqueEmail(findUser);
    const newCodeEmailConfirmed = randomCharacterGenerator();
    sendToEmailConfirmation(userId, newEmail, newCodeEmailConfirmed);
    dataSave = {
      email: newEmail,
      firstName,
      lastName,
      emailConfirmed: false,
      mailConfirmationCode: newCodeEmailConfirmed,
    };
  } else {
    dataSave = {
      firstName,
      lastName,
    };
  }
  await User.update(dataSave, { where: { id: userId } });
  if (newEmail) {
    return {
      message: `User updated. A confirmation email has been sent to ${newEmail}`,
      statusCode: 201,
    };
  }
  return { message: "User updated.", statusCode: 201 };
}

export async function updatePasswordUser(
  oldPassword: string,
  newPassword: string,
  repeatNewPassword: string,
  userId: number
) {
  if (!(newPassword === repeatNewPassword)) {
    throw { message: "New passwords do not match", statusCode: 400 };
  }
  const oneUser = await User.findOne({ where: { id: userId } });
  const resultParse = await parsePassword(oldPassword, oneUser.password);
  if (!resultParse) {
    throw { message: "Wrong password", statusCode: 400 };
  }
  const hashNewPassword = await hashPassword(newPassword);
  await User.update({ password: hashNewPassword }, { where: { id: userId } });
  return { message: "Password changed successfully.", statusCode: 201 };
}

export async function checkEmailUser(userId: number, codeConfirmation: string) {
  const user = await User.findOne({ where: { id: userId } });
  if (codeConfirmation === user.mailConfirmationCode) {
    await User.update({ emailConfirmed: true }, { where: { id: user.id } });
    return { message: "Email confirmed", statusCode: 200 };
  }
  return {
    message: "Email not confirmed, you may be using an old email.",
    statusCode: 404,
  };
}
