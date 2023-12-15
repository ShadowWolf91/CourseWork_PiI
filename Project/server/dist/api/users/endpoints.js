"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserEndpoints {
}
UserEndpoints.LOGIN = '/login';
UserEndpoints.GET_USER_BY_LOGIN = '/one/:login';
UserEndpoints.GET_ALL_USERS = '/';
UserEndpoints.GET_USER_TOKENS = '/tokens';
UserEndpoints.CREATE_USER = '/create';
UserEndpoints.CREATE_USER_TOKEN = '/tokens/create';
UserEndpoints.UPDATE_USER_DATA = '/update';
UserEndpoints.UPDATE_USER_TOKEN = '/tokens/update';
UserEndpoints.DELETE_USERS = '/delete';
UserEndpoints.DELETE_USER_TOKENS = '/tokens/delete';
UserEndpoints.BASE = '/users';
exports.default = UserEndpoints;
//# sourceMappingURL=endpoints.js.map