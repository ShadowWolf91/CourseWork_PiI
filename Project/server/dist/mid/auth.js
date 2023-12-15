"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
function default_1(req, _res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader)
        return next(userRequestError_1.default.Unauthorized());
    next();
}
exports.default = default_1;
//# sourceMappingURL=auth.js.map