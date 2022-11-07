import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { SECRET_KEY } from "../data/constants";

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
  return jwt.sign({ id, email }, SECRET_KEY, {
    expiresIn: "24h",
  });
}
