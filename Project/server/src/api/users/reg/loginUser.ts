import { Roles } from "../../enums";

export interface ILoginUserRequest {
  username: string;
  password: string;
}

export interface ILoginUserResponse {
  refreshToken: string;
  role: keyof typeof Roles;
  username: string;
  id_user: number;
}
