export type AddRoleDTO = {
  body: { newRole: string };
};

export type UpdateRoleDTO = {
  body: {
    idRole: number;
    newName: string;
  };
};
