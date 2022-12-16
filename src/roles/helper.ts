import { Role } from "../models/role";

export async function checkUniqueRole(newRole: string) {
  const role = await Role.findOne({ where: { name: newRole } });
  if (role) {
    throw { message: "This role already exists.", statusCode: 400 };
  }
}

export function convertToLowerCamelCase(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase());
}

export function checkSymbol(name: string) {
  const result = RegExp(/[^a-zа-яёA-ZА-ЯЁ\s]/gi, "").test(name);
  if (result) {
    throw { message: "Name must not contain characters.", statusCode: 400 };
  }
}

export async function checkIsSustem(idRole: number) {
  const role = await Role.findOne({ where: { id: idRole } });
  if (role.isSystem) {
    throw { message: "This is a system role.", statusCode: 403 };
  }
}

export async function checkRole(idRole: number) {
  const role = await Role.findOne({ where: { id: idRole } });
  if (!role) {
    throw { message: "No such role exists.", statusCode: 404 };
  }
}
