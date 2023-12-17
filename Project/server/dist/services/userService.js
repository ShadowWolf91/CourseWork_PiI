"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const node_crypto_1 = require("node:crypto");
const userRequestError_1 = tslib_1.__importDefault(require("../errors/userRequestError"));
const prismaClient_1 = tslib_1.__importDefault(require("../prismaClient"));
class UserService {
}
_a = UserService;
UserService.getUserByUsername = async ({ username }) => prismaClient_1.default.user.findUnique({
    where: { username },
});
UserService.getAllUsers = async ({ cursor, username, skip, take, }) => prismaClient_1.default.user.findMany({
    skip,
    take,
    cursor: cursor ? { id_user: cursor } : undefined,
    where: { username: { contains: username, mode: "insensitive" } },
});
UserService.getUserTokens = async ({ id_user }) => prismaClient_1.default.user.findMany({ where: { id_user } });
UserService.createUser = async ({ username, password, role, refreshToken, }) => {
    const user = await prismaClient_1.default.user.findUnique({
        where: { username },
        select: { id_user: true },
    });
    if (user)
        throw userRequestError_1.default.BadRequest("USERNAME ALREADY TAKEN");
    return prismaClient_1.default.user.create({
        data: {
            username,
            role,
            password: (0, node_crypto_1.createHash)("sha512").update(password).digest("hex"),
            refreshToken,
            statistics: { create: {} },
        },
    });
};
UserService.updateUserData = async ({ id_user, username, role, password, }) => {
    const user = await prismaClient_1.default.user.findUnique({
        where: { id_user: id_user },
        select: { id_user: true },
    });
    if (!user)
        throw userRequestError_1.default.NotFound(`USER WITH ID ${id_user} NOT FOUND`);
    return prismaClient_1.default.user.update({
        where: { id_user: id_user },
        data: {
            username,
            role,
            password: password
                ? (0, node_crypto_1.createHash)("sha512").update(password).digest("hex")
                : undefined,
        },
    });
};
UserService.deleteUsers = async ({ userIds }) => prismaClient_1.default.user.deleteMany({
    where: {
        id_user: { in: userIds },
    },
});
UserService.deleteUser = async ({ id_user }) => {
    const user = await prismaClient_1.default.user.findUnique({
        where: { id_user: id_user },
        select: { id_user: true },
    });
    if (!user)
        throw userRequestError_1.default.NotFound(`SUBJECT WITH ID ${id_user} NOT FOUND`);
    return prismaClient_1.default.user.delete({
        where: { id_user: id_user },
    });
};
exports.default = UserService;
//# sourceMappingURL=userService.js.map