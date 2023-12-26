"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mainValidator_1 = tslib_1.__importDefault(require("./mainValidator"));
const enums_1 = require("../api/enums");
class ProductDataValidator extends mainValidator_1.default {
    static subject_id(location) {
        return location("subject_id")
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
    static themeName(location, isOptional = true, length = undefined) {
        return mainValidator_1.default.title(location, isOptional, length, "title");
    }
    static questionAmount(location, isOptional = false) {
        return isOptional
            ? location("questionAmount")
                .optional({ values: "undefined" })
                .isInt({ min: 0, max: 20 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 20")
                .toInt()
            : location("questionAmount")
                .isInt({ min: 0, max: 20 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 20")
                .toInt();
    }
    static time(location, isOptional = false) {
        return isOptional
            ? location("time")
                .optional({ values: "undefined" })
                .isInt({ min: 0, max: 20 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 20")
                .toInt()
            : location("time")
                .isInt({ min: 0, max: 20 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 20")
                .toInt();
    }
    static modes(location, isOptional = false) {
        return isOptional
            ? location("modes")
                .isString()
                .withMessage("SHOULD BE STRING")
                .isIn(Object.values(enums_1.Modes))
                .withMessage(`ALLOWED VALUES: ${Object.values(enums_1.Modes).join(" | ")}`)
            : location("modes")
                .optional()
                .isString()
                .withMessage("SHOULD BE STRING")
                .isIn(Object.values(enums_1.Modes))
                .withMessage(`ALLOWED VALUES: ${Object.values(enums_1.Modes).join(" | ")}`);
    }
    static themeId(location) {
        return location("themeId")
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
}
exports.default = ProductDataValidator;
//# sourceMappingURL=themeValidator.js.map