"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mainValidator_1 = tslib_1.__importDefault(require("./mainValidator"));
class ProductDataValidator extends mainValidator_1.default {
    static theme_id(location) {
        return mainValidator_1.default.id(location, "theme_id");
    }
    static question(location) {
        return location("question")
            .isString()
            .withMessage("SHOULD BE A STRING")
            .not()
            .isEmpty()
            .withMessage("SHOULD BE A STRING");
    }
    static correctAnswer(location) {
        return location("word")
            .isString()
            .withMessage("SHOULD BE A STRING")
            .not()
            .isEmpty()
            .withMessage("SHOULD BE A STRING");
    }
    static openQuestionName(location, isOptional = true, length = undefined) {
        return mainValidator_1.default.title(location, isOptional, length, "title");
    }
    static statistic_id(location) {
        return mainValidator_1.default.id(location, "statistic_id");
    }
    static openQuestionId(location) {
        return location("testId")
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
}
exports.default = ProductDataValidator;
//# sourceMappingURL=openQuestionValidator.js.map