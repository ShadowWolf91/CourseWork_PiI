"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
function getValidationResult(req) {
    const validatedData = (0, express_validator_1.validationResult)(req);
    return validatedData.isEmpty() ? null : validatedData.array()[0];
}
exports.default = getValidationResult;
//# sourceMappingURL=getValidationResult.js.map