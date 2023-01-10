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
      const valueObjFilter = Object.values(TARGET_OBJECTS[entity]);

      const resultUserPermission = await findPirmission(id, action);
      const permissionsUser: string[] =
        transformPermissionToArray(resultUserPermission);
      const resultFilterReq = filterReqUser(reqKeys, keysObjFilter);
      const resultFilterPermissionUser = filterPermissionUser(
        permissionsUser,
        valueObjFilter
      );
      if (!resultFilterPermissionUser[0]) {
        return res.status(401).json("Not enough rights.");
      }
      resultFilterReq.forEach((reqUserKey) => {
        resultFilterPermissionUser.forEach((permision) => {
          if (!(permision === TARGET_OBJECTS[entity][reqUserKey])) {
            console.log("Not role 2");
            return res.status(401).json("Not enough rights.");
          }
        });
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
