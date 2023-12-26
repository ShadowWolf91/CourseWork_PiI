"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const enums_1 = require("../api/enums");
const config_1 = require("../config");
class Tokenizator {
    static generateTokens({ username, role = enums_1.Roles.DEFAULT, device_id, }) {
        const accessToken = (0, jsonwebtoken_1.sign)({ username, role, device_id }, config_1.CONFIG.JWT_ACCESS, {
            expiresIn: "3d",
            algorithm: "HS512",
        });
        const refreshToken = (0, jsonwebtoken_1.sign)({ username, role, device_id }, config_1.CONFIG.JWT_REFRESH, {
            expiresIn: "15d",
            algorithm: "HS512",
        });
        return { accessToken, refreshToken };
    }
    static validateAccessToken(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, config_1.CONFIG.JWT_ACCESS);
        }
        catch (e) {
            return null;
        }
    }
    static validateRefreshToken(token) {
        try {
            return (0, jsonwebtoken_1.verify)(token, config_1.CONFIG.JWT_REFRESH);
        }
        catch (e) {
            return null;
        }
    }
}
exports.default = Tokenizator;
//# sourceMappingURL=tokenizator.js.map