import { Roles } from "../../enums";

export interface ILoginUserRequest {
  username: string;
  password: string;
  device_id: string;
}

export interface ILoginUserRequestCookies {
  refreshToken: string;
}

export interface ILoginUserResponse {
  user_id: number;
  refreshToken: string;
  accessToken: string;
  device_id: string;
  role: keyof typeof Roles;
  username: string;
}
