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
UserService.getUserTokens = async ({ user_id }) => prismaClient_1.default.userToken.findMany({ where: { user_id } });
UserService.getAllUsers = async ({ cursor, username, skip, take, }) => prismaClient_1.default.user.findMany({
    skip: skip,
    take: take,
    cursor: cursor ? { id_user: cursor } : undefined,
    where: { username: { contains: username, mode: "insensitive" } },
});
UserService.createUser = async ({ username, password, role, }) => {
    const user = await prismaClient_1.default.user.findUnique({
        where: { username },
        select: { id_user: true },
    });
    if (user)
        throw userRequestError_1.default.BadRequest("USERNAME ALREADY TAKEN");
    return prismaClient_1.default.user.create({
        data: {
            username,
            password: (0, node_crypto_1.createHash)("sha512").update(password).digest("hex"),
            role,
            statistics: { create: {} },
        },
        include: { userToken: true },
    });
};
UserService.createUserToken = async ({ device_id, refreshToken, user_id, }) => {
    const user = await prismaClient_1.default.user.findUnique({
        where: { id_user: user_id },
        select: { id_user: true },
    });
    if (!user)
        throw userRequestError_1.default.NotFound(`USER WITH ID ${user_id} NOT FOUND`);
    const device = await prismaClient_1.default.userToken.findUnique({
        where: {
            user_id_device_id: {
                device_id,
                user_id,
            },
        },
        select: { device_id: true },
    });
    if (device)
        throw userRequestError_1.default.BadRequest(`DEVICE ID ${device.device_id} ALREADY TAKEN`);
    return prismaClient_1.default.userToken.create({
        data: { refreshToken, device_id, user_id },
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
UserService.updateUserToken = async ({ user_id, device_id, refreshToken, }) => {
    const user = await prismaClient_1.default.user.findUnique({
        where: { id_user: user_id },
        select: { id_user: true },
    });
    if (!user)
        throw userRequestError_1.default.NotFound(`USER WITH ID ${user_id} NOT FOUND`);
    const device = await prismaClient_1.default.userToken.findUnique({
        where: { user_id_device_id: { user_id, device_id } },
        select: { device_id: true },
    });
    if (!device)
        throw userRequestError_1.default.NotFound(`DEVICE WITH ID ${device_id} NOT FOUND`);
    return prismaClient_1.default.userToken.update({
        where: { user_id_device_id: { user_id, device_id } },
        data: { refreshToken },
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
UserService.deleteUserTokens = async ({ user_id, devices_id, }) => prismaClient_1.default.userToken.deleteMany({
    where: {
        device_id: { in: devices_id },
        user_id,
    },
});
exports.default = UserService;
//# sourceMappingURL=userService.js.map