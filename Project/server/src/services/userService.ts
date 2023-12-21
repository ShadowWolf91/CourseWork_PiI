import { createHash } from "node:crypto";
import { ICreateUserRequest } from "../api/users/reg/createUser";
import { IDeleteUsersRequest } from "../api/users/reg/deleteUsers";
import { IDeleteUserRequest } from "../api/users/reg/deleteUser";
import { IGetAllUsersRequest } from "../api/users/reg/getAllUsers";
import { IGetUserByUsernameRequest } from "../api/users/reg/getUserByUsername";
import { IGetUserTokensRequest } from "../api/users/reg/getUserTokens";
import { IUpdateUserDataRequest } from "../api/users/reg/updateUserData";
import UserRequestError from "../errors/userRequestError";
import prismaClient from "../prismaClient";

export default class UserService {
  //get
  static getUserByUsername = async ({ username }: IGetUserByUsernameRequest) =>
    prismaClient.user.findUnique({
      where: { username },
    });

  static getUserTokens = async ({ id_user }: IGetUserTokensRequest) =>
    prismaClient.user.findMany({ where: { id_user } });

  static getAllUsers = async ({
    cursor,
    username,
    skip,
    take,
  }: IGetAllUsersRequest) =>
    prismaClient.user.findMany({
      skip,
      take,
      cursor: cursor ? { id_user: cursor } : undefined,
      where: { username: { contains: username, mode: "insensitive" } },
    });

  //create
  static createUser = async ({
    username,
    password,
    role,
    refreshToken,
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
        refreshToken,
        statistics: { create: {} },
      },
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
}
