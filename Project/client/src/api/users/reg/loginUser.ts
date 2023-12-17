import { Roles } from "../../enums";

export interface ILoginUserRequest {
  username: string;
  password: string;
}

export interface ILoginUserResponse {
  id_user: number;
  refreshToken: string;
  role: keyof typeof Roles;
  username: string;
}
