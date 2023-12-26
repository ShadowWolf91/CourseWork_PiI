"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const enums_1 = require("../api/enums");
const mainValidator_1 = tslib_1.__importDefault(require("./mainValidator"));
class UserDataValidator extends mainValidator_1.default {
    static username(location, isOptional = true, length = undefined) {
        return mainValidator_1.default.title(location, isOptional, length, "username");
    }
    static device_id(location, isArray = false) {
        return isArray
            ? location("device_id")
                .isArray()
                .withMessage("SHOULD BE AN ARRAY OF STRINGS")
            : location("device_id")
                .isString()
                .withMessage("SHOULD BE A STRING")
                .not()
                .isEmpty()
                .withMessage("SHOULD BE A NON EMPTY STRING");
    }
    static password(location, isOptional = false, length = undefined) {
        const result = isOptional
            ? location("password").optional({ values: "undefined" })
            : location("password");
        return length
            ? result
                .isLength({
                min: length.min || 0,
                max: length.max,
            })
                .withMessage(`${length?.min || 0} >= LENGTH <= ${length?.max}`)
            : result;
    }
    static user_id(location) {
        return location("user_id")
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
    static role(location) {
        return location("role")
            .optional({ values: "undefined" })
            .isString()
            .withMessage("SHOULD BE A STRING")
            .isIn(Object.values(enums_1.Roles))
            .withMessage({
            message: `SHOULD BE ${enums_1.Roles.DEFAULT} or ${enums_1.Roles.TEACHER} or ${enums_1.Roles.ADMIN}`,
        });
    }
    static refreshToken(location) {
        return location("refreshToken")
            .isString()
            .withMessage("SHOULD BE A STRING")
            .not()
            .isEmpty()
            .withMessage("SHOULD BE A STRING");
    }
    static device_idArrayEntries(location) {
        return location("deviceId.*")
            .isString()
            .withMessage("SHOULD BE A STRING")
            .not()
            .isEmpty()
            .withMessage("SHOULD BE A STRING");
    }
}
exports.default = UserDataValidator;
//# sourceMappingURL=userValidator.js.map