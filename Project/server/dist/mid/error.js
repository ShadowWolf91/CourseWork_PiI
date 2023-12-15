"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
function default_1(err, _req, res, _next) {
    if (err instanceof userRequestError_1.default) {
        return res.status(err?.code).json({
            code: err.code,
            message: err.message,
            field: err.field,
            location: err.location,
            value: err.value,
        });
    }
    console.error(err);
    return res.status(500).json({ message: 'SERVER ERROR' });
}
exports.default = default_1;
//# sourceMappingURL=error.js.map