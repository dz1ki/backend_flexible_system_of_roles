import {
  filterPermissionUser,
  filterReqUser,
  findPermissionObjUser,
  findPirmission,
  transformPermissionToArray,
} from "./helper";
import TARGET_OBJECTS from "./target.object";

export function checkRoleMiddleware(action: string, entity: string) {
  return async function roleMiddleware(req, res, next) {
    try {
      const { id } = req.user;
      const reqKeys = Object.keys(req.body);
      const keysObjFilter = Object.keys(TARGET_OBJECTS[entity]);
      const valueObjFilter: string[] = Object.values(TARGET_OBJECTS[entity]);

      const resultUserPermission = await findPirmission(id, action);
      const permissionsUser: string[] =
        transformPermissionToArray(resultUserPermission);
      const resultFilterReq = filterReqUser(reqKeys, keysObjFilter);
      const resultFilterPermissionUser = filterPermissionUser(
        permissionsUser,
        valueObjFilter
      );

      if (!resultFilterPermissionUser[0]) {
        return res.status(403).json({ message: "Not enough rights." });
      }
      resultFilterReq.forEach((reqUserKey) => {
        const result = resultFilterPermissionUser.includes(
          TARGET_OBJECTS[entity][reqUserKey]
        );
        if (!result) {
          throw {
            message: `Insufficient rights to access the field ${TARGET_OBJECTS[entity][reqUserKey]}`,
            statusCode: 403,
          };
        }
      });
      const permissionObjUser: string[] = findPermissionObjUser(
        resultFilterPermissionUser
      );
      req.userPermission = permissionObjUser;
      next();
    } catch (e) {
      res.status(401).json(e.message || "Server error");
    }
  };
}
