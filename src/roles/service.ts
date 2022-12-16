import { Role } from "../models/role";
import {
  checkIsSustem,
  checkRole,
  checkSymbol,
  checkUniqueRole,
  convertToLowerCamelCase,
} from "./helper";

export async function addRole(newRole: string) {
  checkSymbol(newRole);
  await checkUniqueRole(newRole);
  const resultConvert = convertToLowerCamelCase(newRole);
  await Role.create({
    name: newRole,
    slugname: resultConvert,
    isSystem: false,
  });
  return { message: "Role saved successfully.", statusCode: 201 };
}

export async function updateOneRole(idRole: number, newName: string) {
  checkSymbol(newName);
  await checkUniqueRole(newName);
  await checkIsSustem(idRole);
  const resultConvert = convertToLowerCamelCase(newName);
  await Role.update(
    { name: newName, slugname: resultConvert },
    { where: { id: idRole } }
  );
  return { message: "Role successfully updated.", statusCode: 200 };
}

export async function dropRole(idRole: number) {
  await checkRole(idRole);
  await checkIsSustem(idRole);
  await Role.destroy({ where: { id: idRole } });
  return { message: "Role deleted successfully", statusCode: 200 };
}
