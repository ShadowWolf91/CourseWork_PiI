"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const enums_1 = require("../api/enums");
const config_1 = require("../config");
class Tokenizator {
    static generateTokens({ username, role = enums_1.Roles.DEFAULT, }) {
        const token = (0, jsonwebtoken_1.sign)({ username, role }, config_1.CONFIG.JWT_REFRESH, {
            expiresIn: '15d',
            algorithm: 'HS512',
        });
        return { token };
    }
    static validateToken(token) {
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