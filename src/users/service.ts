import { sendToEmailConfirmation } from "../mailer/mailer";
import { User } from "../models/user";
import {
  checkOrChangingMail,
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
  await User.create({
    email: userEmail,
    firstName,
    lastName,
    mailConfirmationCode,
    password: resultHash,
  });
  await sendToEmailConfirmation(userEmail, mailConfirmationCode);
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
  oldEmail: string,
  newEmail: string,
  firstName: string,
  lastName: string
) {
  const newCodeEmailConfirmed = checkOrChangingMail(newEmail);
  await User.update(
    {
      email: newEmail,
      firstName,
      lastName,
      mailConfirmationCode: newCodeEmailConfirmed,
    },
    { where: { email: oldEmail } }
  );
  if (newCodeEmailConfirmed) {
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
  userEmail: string
) {
  if (!(newPassword === repeatNewPassword)) {
    throw { message: "New passwords do not match", statusCode: 400 };
  }
  const oneUser = await User.findOne({ where: { email: userEmail } });
  const resultParse = await parsePassword(oldPassword, oneUser.password);
  if (!resultParse) {
    throw { message: "Wrong password", statusCode: 400 };
  }
  const hashNewPassword = await hashPassword(newPassword);
  await User.update(
    { password: hashNewPassword },
    { where: { email: userEmail } }
  );
  return { message: "Password changed successfully.", statusCode: 201 };
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
