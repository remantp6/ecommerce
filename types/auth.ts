//define the payload type for user registration
export type RegisterPayloadTypes = {
  username: string;
  email: string;
  password: string;
  role: "USER" | "ADMIN";
};

//define the user type
export interface userTypes {
  _id: string;
  username: string;
  role: "USER" | "ADMIN";
  avatar?: {
    url: string;
  };
  email: string;
}

//define the response type for user login
export type LoginResponseTypes = {
  accessToken: string;
  refreshToken: string;
  user: userTypes;
};

//define the payload type for user login
export type LoginPayloadTypes = {
  password: string;
  username: string;
};

export type LogoutResponse = {
  message?: string;
};
