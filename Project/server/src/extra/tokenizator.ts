import { sign, verify } from "jsonwebtoken";
import { Roles } from "../api/enums";
import { CONFIG } from "../config";

export default class Tokenizator {
  static generateTokens({
    username,
    role = Roles.DEFAULT,
  }: {
    username: string;
    role?: keyof typeof Roles;
  }) {
    const refreshToken = sign({ username, role }, CONFIG.JWT_REFRESH, {
      expiresIn: "15d",
      algorithm: "HS512",
    });

    return { refreshToken };
  }

  static validateToken(refreshToken: string) {
    try {
      return verify(refreshToken, CONFIG.JWT_REFRESH);
    } catch (e) {
      return null;
    }
  }
}
