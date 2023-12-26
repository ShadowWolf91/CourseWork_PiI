"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const endpoints_1 = tslib_1.__importDefault(require("../api/users/endpoints"));
const userController_1 = tslib_1.__importDefault(require("../controllers/userController"));
const userValidator_1 = tslib_1.__importDefault(require("../validators/userValidator"));
const userRouter = (0, express_1.Router)();
userRouter.post(endpoints_1.default.USERNAME, userValidator_1.default.username(express_validator_1.body, false, { max: 30, min: 4 }), userValidator_1.default.password(express_validator_1.body, false, { max: 120, min: 8 }), userValidator_1.default.device_id(express_validator_1.body), userController_1.default.loginUser);
userRouter.get(endpoints_1.default.GET_USER_BY_USERNAME, userValidator_1.default.username(express_validator_1.query), userController_1.default.getUserByUsername);
userRouter.get(endpoints_1.default.GET_ALL_USERS, userValidator_1.default.take(express_validator_1.query), userValidator_1.default.skip(express_validator_1.query), userValidator_1.default.username(express_validator_1.query, true), userValidator_1.default.cursor(express_validator_1.query), userController_1.default.getAllUsers);
userRouter.get(endpoints_1.default.GET_USER_TOKENS, userValidator_1.default.user_id(express_validator_1.query), userController_1.default.getUserTokens);
userRouter.post(endpoints_1.default.CREATE_USER, userValidator_1.default.username(express_validator_1.body, false, { max: 30, min: 4 }), userValidator_1.default.password(express_validator_1.body, false, { max: 120, min: 8 }), userValidator_1.default.role(express_validator_1.body), userController_1.default.createUser);
userRouter.post(endpoints_1.default.CREATE_USER_TOKEN, userValidator_1.default.user_id(express_validator_1.body), userValidator_1.default.device_id(express_validator_1.body), userController_1.default.createUserToken);
userRouter.patch(endpoints_1.default.UPDATE_USER_DATA, userValidator_1.default.user_id(express_validator_1.body), userValidator_1.default.username(express_validator_1.body, true, { max: 30 }), userValidator_1.default.password(express_validator_1.body, true, { max: 120 }), userController_1.default.updateUserData);
userRouter.patch(endpoints_1.default.UPDATE_USER_TOKEN, userValidator_1.default.user_id(express_validator_1.body), userValidator_1.default.device_id(express_validator_1.body), userValidator_1.default.username(express_validator_1.body, false, { max: 30 }), userController_1.default.updateUserToken);
userRouter.delete(endpoints_1.default.DELETE_USERS, userValidator_1.default.ids(express_validator_1.body, "userIds"), userController_1.default.deleteUsers);
userRouter.delete(endpoints_1.default.DELETE_USER, userValidator_1.default.user_id(express_validator_1.body), userController_1.default.deleteUser);
userRouter.delete(endpoints_1.default.DELETE_USER_TOKENS, userValidator_1.default.user_id(express_validator_1.body), userValidator_1.default.device_id(express_validator_1.body, true), userValidator_1.default.device_idArrayEntries(express_validator_1.body), userController_1.default.deleteUserTokens);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map