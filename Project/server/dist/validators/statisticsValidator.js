"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mainValidator_1 = tslib_1.__importDefault(require("./mainValidator"));
class ProductDataValidator extends mainValidator_1.default {
    static user_id(location) {
        return mainValidator_1.default.id(location, "theme_id");
    }
    static rightAnsweredTests(location, isOptional = false) {
        return isOptional
            ? location("rightAnsweredTests")
                .optional({ values: "undefined" })
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt()
            : location("rightAnsweredTests")
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt();
    }
    static rightAnsweredCards(location, isOptional = false) {
        return isOptional
            ? location("rightAnsweredCards")
                .optional({ values: "undefined" })
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt()
            : location("rightAnsweredCards")
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt();
    }
    static rightAnsweredOQs(location, isOptional = false) {
        return isOptional
            ? location("rightAnsweredOQs")
                .optional({ values: "undefined" })
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt()
            : location("rightAnsweredOQs")
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt();
    }
    static markTests(location, isOptional = false) {
        return isOptional
            ? location("markTests")
                .optional({ values: "undefined" })
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt()
            : location("markTests")
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt();
    }
    static markCards(location, isOptional = false) {
        return isOptional
            ? location("markCards")
                .optional({ values: "undefined" })
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt()
            : location("markCards")
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt();
    }
    static markOpenQuestions(location, isOptional = false) {
        return isOptional
            ? location("markOpenQuestions")
                .optional({ values: "undefined" })
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt()
            : location("markOpenQuestions")
                .isInt({ min: 0, max: 32767 })
                .withMessage("SHOULD BE AN INT >= 0 AND <= 32767")
                .toInt();
    }
    static title(location, isOptional = true, length = undefined) {
        return mainValidator_1.default.title(location, isOptional, length, "title");
    }
}
exports.default = ProductDataValidator;
//# sourceMappingURL=statisticsValidator.js.map