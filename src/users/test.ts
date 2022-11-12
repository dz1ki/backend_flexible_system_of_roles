import { Role } from "../models/role";
import { User } from "../models/user";
import { Permission } from "../models/permission";
import { PermissionObject } from "../models/object.permission";
import "../models/association.for.models";
async function test() {
  const resultUser = await User.findAll({
    // where: { email: "doel123@examples.com" },
    include: { all: true, nested: true },
    // raw: true,
    nest: true,
  });
  console.log("🚀 ~ test ~ resultUser", JSON.stringify(resultUser));
  // resultUser.forEach((user) => {
  //   console.log("🚀 ~ resultUser.forEach ~ user", user.roles);
  // });

  // const c = [user[0]];

  // let objectPermission = [];
  // user.forEach((user) => {
  //   user.roles.forEach((role) => {
  //     role.permissions.forEach((permission) => {
  //       if (permission.action === "Read") {
  //         // objectPermission.push(permission.permissionObject.slugname);
  //         console.log(permission.permissionObject);
  //       }
  //     });
  //   });
  // });
  //const result = [...new Set(objectPermission)];
  //console.log("🚀 ~ test ~ objectPermission", result);
}

test();
