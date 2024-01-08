import { sign, verify } from "jsonwebtoken";
import { Roles } from "../api/enums";
import { CONFIG } from "../config";

export default class Tokenizator {
  static generateTokens({
    username,
    role = Roles.STUDENT,
    device_id,
  }: {
    username: string;
    role?: keyof typeof Roles;
    device_id: string;
  }) {
    const accessToken = sign({ username, role, device_id }, CONFIG.JWT_ACCESS, {
      expiresIn: "3d",
      algorithm: "HS512",
    });
    const refreshToken = sign(
      { username, role, device_id },
      CONFIG.JWT_REFRESH,
      {
        expiresIn: "15d",
        algorithm: "HS512",
      }
    );

    return { accessToken, refreshToken };
  }

  static validateAccessToken(token: string) {
    try {
      return verify(token, CONFIG.JWT_ACCESS);
    } catch (e) {
      return null;
    }
  }

  static validateRefreshToken(token: string) {
    try {
      return verify(token, CONFIG.JWT_REFRESH);
    } catch (e) {
      return null;
    }
  }
}
