"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
function callUnprocessableEntity(next, error) {
    return next(userRequestError_1.default.UnprocessableEntity({
        message: error.msg,
        location: error.location,
        field: error.path,
        value: error?.value,
    }));
}
exports.default = callUnprocessableEntity;
//# sourceMappingURL=callUnprocessableEntity.js.map