import { sendToEmailConfirmation } from "../mailer/mailer";
import { Role } from "../models/role";
import { User } from "../models/user";
import { UserRole } from "../models/user.role";

import {
  checkIsSustemUserRole,
  checkPasswordUser,
  checkRoleUser,
  checkUniqueEmail,
  checkUniqueRoleUser,
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
  const confirmationCode = randomCharacterGenerator();
  const user = await User.create({
    email: userEmail,
    firstName,
    lastName,
    mailConfirmationCode: confirmationCode,
    password: resultHash,
  });
  await UserRole.create({ userId: user.id, roleId: 2 });
  await sendToEmailConfirmation(user.id, userEmail, confirmationCode);
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

export async function listUsers(userPermission: string[]) {
  const users = await User.findAll({
    include: [
      {
        model: Role,
        through: { attributes: [] },
        as: "roles",
      },
    ],
  });
  const usersData = users.map((user) => {
    let filtrDataUser = {};
    userPermission.forEach(
      (permission) => (filtrDataUser[permission] = user[permission])
    );
    return filtrDataUser;
  });
  return usersData;
}

export async function addRoleUser(roleId: number, userId: number) {
  await checkUniqueRoleUser(roleId, userId);
  await UserRole.create({ roleId, userId });
  return { message: "Role added to user", statusCode: 201 };
}

export async function dropRoleUser(roleId: number, userId: number) {
  await checkRoleUser(roleId, userId);
  await checkIsSustemUserRole(roleId, userId);
  await UserRole.destroy({ where: { roleId, userId } });
  return { message: "Role delete at user", statusCode: 200 };
}
