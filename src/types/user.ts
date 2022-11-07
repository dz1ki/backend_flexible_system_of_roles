import { type } from "os";

export type RegistrationDTO = {
  body: {
    firstName: string;
    lastName: string;
    userEmail: string;
    password: string;
  };
};

export type checkEmailDTO = {
  body: {
    email: string;
    code: string;
  };
};

export type AuthorizationDTO = {
  body: {
    email: string;
    password: string;
  };
};
export type UpdatePasswordDTO = {
  body: {
    oldPassword: string;
    newPassword: string;
    repeatNewPassword: string;
  };
  user: {
    email: string;
    id: number;
  };
};
