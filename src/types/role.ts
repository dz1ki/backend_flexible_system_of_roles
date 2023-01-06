export type AddRoleDTO = {
  body: { name: string };
};

export type UpdateRoleDTO = {
  body: {
    id: number;
    name: string;
  };
};
