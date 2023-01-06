import {
  checkFullPermissionEntity,
  findPirmission,
  transformPermissionToArray,
} from "./helper";
import TARGET_OBJECTS from "./target.object";

export function checkRoleMiddleware(action: string, entity: string) {
  return async function roleMiddleware(req, res, next) {
    try {
      const { id } = req.user;
      const resultUserPermission = await findPirmission(id, action);
      const arrayPermissions = transformPermissionToArray(resultUserPermission);
      const fullPermissionEntity = checkFullPermissionEntity(
        arrayPermissions,
        entity
      );
      if (fullPermissionEntity) {
        return next();
      }
      throw { message: "Not enough rights" };
    } catch (e) {
      res.status(401).json(e.message || "Server error");
    }
  };
}
