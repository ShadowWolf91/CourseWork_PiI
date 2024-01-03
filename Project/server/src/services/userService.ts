import { createHash } from "node:crypto";
import { ICreateUserRequest } from "../api/users/reg/createUser";
import { ICreateUserTokenRequest } from "../api/users/reg/createUserToken";
import { IDeleteUsersRequest } from "../api/users/reg/deleteUsers";
import { IDeleteUserRequest } from "../api/users/reg/deleteUser";
import { IDeleteUserTokensRequest } from "../api/users/reg/deleteUserTokens";
import { IGetAllUsersRequest } from "../api/users/reg/getAllUsers";
import { IGetUserByUsernameRequest } from "../api/users/reg/getUserByUsername";
import { IGetUserTokensRequest } from "../api/users/reg/getUserTokens";
import { IUpdateUserDataRequest } from "../api/users/reg/updateUserData";
import { IUpdateUserTokenRequest } from "../api/users/reg/updateUserToken";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class UserService {
  //get
  static getUserByUsername = async ({ username }: IGetUserByUsernameRequest) =>
    prismaClient.user.findUnique({
      where: { username },
    });

  static getUserTokens = async ({ user_id }: IGetUserTokensRequest) =>
    prismaClient.userToken.findMany({ where: { user_id } });

  static getAllUsers = async ({
    cursor,
    username,
    skip,
    take,
  }: IGetAllUsersRequest) =>
    prismaClient.user.findMany({
      skip: skip,
      take: take,
      cursor: cursor ? { id_user: cursor } : undefined,
      where: { username: { contains: username, mode: "insensitive" } },
    });

  //create
  static createUser = async ({
    username,
    password,
    role,
  }: ICreateUserRequest) => {
    const user = await prismaClient.user.findUnique({
      where: { username },
      select: { id_user: true },
    });
    if (user) throw UserRequestError.BadRequest("USERNAME ALREADY TAKEN");

    return prismaClient.user.create({
      data: {
        username,
        password: createHash("sha512").update(password).digest("hex"),
        role,
      },
      include: { userToken: true },
    });
  };

  static createUserToken = async ({
    device_id,
    refreshToken,
    user_id,
  }: ICreateUserTokenRequest & { refreshToken: string }) => {
    const user = await prismaClient.user.findUnique({
      where: { id_user: user_id },
      select: { id_user: true },
    });
    if (!user)
      throw UserRequestError.NotFound(`USER WITH ID ${user_id} NOT FOUND`);

    const device = await prismaClient.userToken.findUnique({
      where: {
        user_id_device_id: {
          device_id,
          user_id,
        },
      },
      select: { device_id: true },
    });
    if (device)
      throw UserRequestError.BadRequest(
        `DEVICE ID ${device.device_id} ALREADY TAKEN`
      );

    return prismaClient.userToken.create({
      data: { refreshToken, device_id, user_id },
    });
  };

  //update
  static updateUserData = async ({
    id_user,
    username,
    role,
    password,
  }: IUpdateUserDataRequest) => {
    const user = await prismaClient.user.findUnique({
      where: { id_user: id_user },
      select: { id_user: true },
    });
    if (!user)
      throw UserRequestError.NotFound(`USER WITH ID ${id_user} NOT FOUND`);

    return prismaClient.user.update({
      where: { id_user: id_user },
      data: {
        username,
        role,
        password: password
          ? createHash("sha512").update(password).digest("hex")
          : undefined,
      },
    });
  };

  static updateUserToken = async ({
    user_id,
    device_id,
    refreshToken,
  }: IUpdateUserTokenRequest & { refreshToken: string }) => {
    const user = await prismaClient.user.findUnique({
      where: { id_user: user_id },
      select: { id_user: true },
    });
    if (!user)
      throw UserRequestError.NotFound(`USER WITH ID ${user_id} NOT FOUND`);

    const device = await prismaClient.userToken.findUnique({
      where: { user_id_device_id: { user_id, device_id } },
      select: { device_id: true },
    });
    if (!device)
      throw UserRequestError.NotFound(`DEVICE WITH ID ${device_id} NOT FOUND`);

    return prismaClient.userToken.update({
      where: { user_id_device_id: { user_id, device_id } },
      data: { refreshToken },
    });
  };

  //delete
  static deleteUsers = async ({ userIds }: IDeleteUsersRequest) =>
    prismaClient.user.deleteMany({
      where: {
        id_user: { in: userIds },
      },
    });

  static deleteUser = async ({ id_user }: IDeleteUserRequest) => {
    const user = await prismaClient.user.findUnique({
      where: { id_user: id_user },
      select: { id_user: true },
    });

    if (!user)
      throw UserRequestError.NotFound(`SUBJECT WITH ID ${id_user} NOT FOUND`);

    return prismaClient.user.delete({
      where: { id_user: id_user },
    });
  };
  static deleteUserTokens = async ({
    user_id,
    devices_id,
  }: IDeleteUserTokensRequest) =>
    prismaClient.userToken.deleteMany({
      where: {
        device_id: { in: devices_id },
        user_id,
      },
    });
}
