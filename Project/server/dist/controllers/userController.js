"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_crypto_1 = require("node:crypto");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
const callUnprocessableEntity_1 = tslib_1.__importDefault(require("../extra/callUnprocessableEntity"));
const getValidationResult_1 = tslib_1.__importDefault(require("../extra/getValidationResult"));
const tokenizator_1 = tslib_1.__importDefault(require("../extra/tokenizator"));
const userService_1 = tslib_1.__importDefault(require("../services/userService"));
class UserController {
}
_a = UserController;
UserController.loginUser = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const user = await userService_1.default.getUserByUsername(req.query);
        if (!user)
            return next(userRequestError_1.default.NotFound(`USER ${req.query.username} NOT FOUND`));
        if ((0, node_crypto_1.createHash)("sha512").update(req.query.password).digest("hex") !==
            user.password)
            return next(userRequestError_1.default.BadRequest("WRONG PASSWORD"));
        const { refreshToken } = tokenizator_1.default.generateTokens({
            username: user.username,
            role: user.role,
        });
        res
            .cookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        })
            .json({
            refreshToken,
            username: user.username,
            role: user.role,
        });
    }
    catch (e) {
        return next(e);
    }
};
UserController.getUserByUsername = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await userService_1.default.getUserByUsername(req.params);
        if (!result)
            return next(userRequestError_1.default.NotFound(`USER WITH LOGIN ${req.params.username} NOT FOUND`));
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
UserController.getAllUsers = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await userService_1.default.getAllUsers(req.query);
        res.json({
            usersData: result,
            cursor: result[result.length - 1]?.id_user || null,
        });
    }
    catch (e) {
        return next(e);
    }
};
UserController.getUserTokens = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await userService_1.default.getUserTokens(req.query);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
UserController.createUser = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const { refreshToken } = tokenizator_1.default.generateTokens(req.body);
        const result = await userService_1.default.createUser({
            ...req.body,
            refreshToken,
        });
        res.cookie("refreshToken", refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.status(201).json(result);
    }
    catch (e) {
        return next(e);
    }
};
UserController.updateUserData = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await userService_1.default.updateUserData(req.body);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
UserController.deleteUsers = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        const result = await userService_1.default.deleteUsers(req.body);
        res.json(result);
    }
    catch (e) {
        return next(e);
    }
};
UserController.deleteUser = async (req, res, next) => {
    const errorData = (0, getValidationResult_1.default)(req);
    if (errorData)
        return (0, callUnprocessableEntity_1.default)(next, errorData);
    try {
        await userService_1.default.deleteUser(req.body);
        res.json({ count: 1 });
    }
    catch (e) {
        return next(e);
    }
};
exports.default = UserController;
//# sourceMappingURL=userController.js.map