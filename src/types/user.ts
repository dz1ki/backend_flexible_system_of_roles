type MiddelewareAuthDTO = {
  email: string;
  id: number;
};

export type RegistrationDTO = {
  body: {
    firstName: string;
    lastName: string;
    userEmail: string;
    password: string;
  };
};

export type AuthorizationDTO = {
  body: {
    email: string;
    password: string;
  };
};

export type UpdateUserDTO = {
  body: { newEmail: string; firstName: string; lastName: string };
  user: MiddelewareAuthDTO;
};

export type ListUserDTO = {
  user: MiddelewareAuthDTO;
};

export type DropUserDto = {
  user: MiddelewareAuthDTO;
};

export type checkEmailDTO = {
  body: {
    email: string;
    code: string;
  };
};

export type UpdatePasswordDTO = {
  user: MiddelewareAuthDTO;
  body: {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
  };
};
