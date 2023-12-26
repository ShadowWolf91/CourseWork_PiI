"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mainValidator_1 = tslib_1.__importDefault(require("./mainValidator"));
class SubjectValidator extends mainValidator_1.default {
    static subjectName(location, isOptional = true, length = undefined) {
        return mainValidator_1.default.title(location, isOptional, length, "title");
    }
    static idSubject(location) {
        return location("idSubject")
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
    static subjectIdArrayEntries(location) {
        return location("subjectsId.*")
            .isInt({ min: 0 })
            .withMessage("SHOULD BE AN INTEGER >= 0")
            .toInt();
    }
    static subjectId(location, isArray = false) {
        return isArray
            ? location("subjectsId")
                .isArray()
                .withMessage("SHOULD BE AN ARRAY OF INTEGERS")
            : location("subjectId")
                .isInt({ min: 0 })
                .withMessage("SHOULD BE AN INTEGER >= 0")
                .toInt();
    }
}
exports.default = SubjectValidator;
//# sourceMappingURL=subjectValidator.js.map