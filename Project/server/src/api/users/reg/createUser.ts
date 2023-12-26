import { Roles } from "../../enums";

export interface ICreateUserRequest {
  username: string;
  password: string;
  role?: keyof typeof Roles;
}

export interface ICreateUserResponse {
  id_user: number;
  username: string;
  password: string;
  role: keyof typeof Roles;
  userToken: {
    user_id: number;
    device_id: string;
    refreshToken: string;
  }[];
}
