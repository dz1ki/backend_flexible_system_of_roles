import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as config from "config";
import { User } from "src/models/user";

export function checkUniqueEmail(findUser: User) {
  if (findUser) {
    throw { message: "User with this email already exists", statusCode: 400 };
  }
}

export function checkUser(findUser: User) {
  if (!findUser) {
    throw { message: "No such user exists", statusCode: 404 };
  }
}

export function checkPasswordUser(resultParse: boolean) {
  if (!resultParse) {
    throw { message: "Wrong password", statusCode: 400 };
  }
}

export function randomCharacterGenerator() {
  return Math.random().toString(36).substring(2, 7);
}

export async function hashPassword(passwordUser: string) {
  return await bcrypt.hash(passwordUser, 5);
}

export async function parsePassword(password: string, passwordDB: string) {
  return await bcrypt.compare(password, passwordDB);
}

export function generateJwt(id: number, email: string) {
  return jwt.sign({ id, email }, config.get("JWT.key"), {
    expiresIn: "24h",
  });
}
