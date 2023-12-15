"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const endpoints_1 = tslib_1.__importDefault(require("../api/users/endpoints"));
const userController_1 = tslib_1.__importDefault(require("../controllers/userController"));
const auth_1 = tslib_1.__importDefault(require("../mid/auth"));
const userRouter = (0, express_1.Router)();
userRouter.post(endpoints_1.default.LOGIN, userController_1.default.loginUser);
userRouter.get(endpoints_1.default.GET_USER_BY_LOGIN, auth_1.default, userController_1.default.getUserByLogin);
userRouter.get(endpoints_1.default.GET_ALL_USERS, userController_1.default.getAllUsers);
userRouter.get(endpoints_1.default.GET_USER_TOKENS, userController_1.default.getUserTokens);
userRouter.post(endpoints_1.default.CREATE_USER, userController_1.default.createUser);
userRouter.patch(endpoints_1.default.UPDATE_USER_DATA, userController_1.default.updateUserData);
userRouter.delete(endpoints_1.default.DELETE_USERS, userController_1.default.deleteUsers);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map