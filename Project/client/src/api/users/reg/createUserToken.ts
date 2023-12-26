import { Roles } from "../../enums";

export interface ICreateUserTokenRequest {
  user_id: number;
  device_id: string;
  username: string;
  password: string;
  role: keyof typeof Roles;
}

export interface ICreateUserTokenResponse {
  user_id: number;
  device_id: string;
  accessToken: string;
  refreshToken: string;
}
