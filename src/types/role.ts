export type AddRoleDTO = {
  body: { name: string };
};

export type UpdateRoleDTO = {
  body: {
    name: { id: number; name: string };
  };
};

export type DeleteRoleDTO = {
  body: {
    name: { id: number };
  };
};

export type AddPermissionRoleDTO = {
  body: {
    permissions: {
      permissionId: number;
      roleId: number;
    };
  };
};

export type DropPermissionRoleDTO = {
  body: {
    permissions: {
      permissionId: number;
      roleId: number;
    };
  };
};

export type FindUserDTO = {
  userPermission: string[];
};
