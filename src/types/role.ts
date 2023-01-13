export type AddRoleDTO = {
  body: { role: string };
};

export type UpdateRoleDTO = {
  body: {
    role: { id: number; name: string };
  };
};

export type DeleteRoleDTO = {
  body: {
    role: { id: number };
  };
};

export type AddPermissionRoleDTO = {
  body: {
    permission: {
      permissionId: number;
      roleId: number;
    };
  };
};

export type DropPermissionRoleDTO = {
  body: {
    permission: {
      permissionId: number;
      roleId: number;
    };
  };
};
