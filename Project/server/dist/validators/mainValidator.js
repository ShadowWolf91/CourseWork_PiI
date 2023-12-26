"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MainValidator {
    static id(location, field = "id") {
        return location(field)
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
    static ids(location, field) {
        return [
            location(field).isArray().withMessage("SHOULD BE AN ARRAY OF INTEGERS"),
            location(`${field}.*`)
                .isInt()
                .withMessage("SHOULD BE AN ARRAY OF INTEGERS")
                .toInt(),
        ];
    }
    static title(location, isOptional = true, length = undefined, field = "title") {
        const result = isOptional
            ? location(field).optional({ values: "undefined" })
            : location(field).isString().withMessage("SHOULD BE A STRING");
        return length
            ? result
                .isLength({
                min: length.min || 0,
                max: length.max,
            })
                .withMessage(`${length?.min || 0} >= LENGTH <= ${length?.max}`)
            : result;
    }
    static take(location) {
        return location("take")
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
    static skip(location) {
        return location("skip")
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
    static cursor(location) {
        return location("cursor")
            .optional({ values: "undefined" })
            .default(undefined)
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
    static isArray(location, field) {
        return location(field).isArray().withMessage("SHOULD BE AN ARRAY");
    }
    static decimal(location, field) {
        return location(field)
            .isDecimal()
            .withMessage("SHOULD BE DECIMAL STRING")
            .toFloat();
    }
    static date(location, field) {
        return location(field).isDate().withMessage("INVALID DATE");
    }
    static booleanOptional(location, field) {
        return location(field)
            .optional({ values: "undefined" })
            .isBoolean()
            .withMessage("SHOULD BE BOOLEAN")
            .toBoolean(true);
    }
}
exports.default = MainValidator;
//# sourceMappingURL=mainValidator.js.map