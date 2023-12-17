import { RequestHandler } from "express";
import { createHash } from "node:crypto";
import { IErrorResponse } from "../api/errorResponse";
import {
  ICreateUserRequest,
  ICreateUserResponse,
} from "../api/users/reg/createUser";
import {
  IDeleteUsersRequest,
  IDeleteUsersResponse,
} from "../api/users/reg/deleteUsers";
import {
  IDeleteUserRequest,
  IDeleteUserResponse,
} from "../api/users/reg/deleteUser";
import {
  IGetAllUsersRequest,
  IGetAllUsersResponse,
} from "../api/users/reg/getAllUsers";
import {
  IGetUserByUsernameRequest,
  IGetUserByUsernameResponse,
} from "../api/users/reg/getUserByUsername";
import {
  IGetUserTokensRequest,
  IGetUserTokensResponse,
} from "../api/users/reg/getUserTokens";
import {
  ILoginUserRequest,
  ILoginUserResponse,
} from "../api/users/reg/loginUser";
import {
  IUpdateUserDataRequest,
  IUpdateUserDataResponse,
} from "../api/users/reg/updateUserData";
import UserRequestError from "../errors/userRequestError";
import callUnprocessableEntity from "../extra/callUnprocessableEntity";
import getValidationResult from "../extra/getValidationResult";
import Tokenizator from "../extra/tokenizator";
import UserService from "../services/userService";

export default class UserController {
  //login
  static loginUser: RequestHandler<
    undefined,
    ILoginUserResponse | IErrorResponse,
    undefined,
    ILoginUserRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const user = await UserService.getUserByUsername(req.query);
      if (!user)
        return next(
          UserRequestError.NotFound(`USER ${req.query.username} NOT FOUND`)
        );

      if (
        createHash("sha512").update(req.query.password).digest("hex") !==
        user.password
      )
        return next(UserRequestError.BadRequest("WRONG PASSWORD"));

      const { refreshToken } = Tokenizator.generateTokens({
        username: user.username,
        role: user.role,
      });

      res
        .cookie("refreshToken", refreshToken, {
          maxAge: 30 * 24 * 60 * 60 * 1000,
          httpOnly: true,
        })
        .json({
          id_user: user.id_user,
          refreshToken,
          username: user.username,
          role: user.role,
        });
    } catch (e) {
      return next(e);
    }
  };

  //get
  static getUserByUsername: RequestHandler<
    IGetUserByUsernameRequest,
    IGetUserByUsernameResponse | IErrorResponse
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await UserService.getUserByUsername(req.params);
      if (!result)
        return next(
          UserRequestError.NotFound(
            `USER WITH LOGIN ${req.params.username} NOT FOUND`
          )
        );

      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static getAllUsers: RequestHandler<
    undefined,
    IGetAllUsersResponse | IErrorResponse,
    undefined,
    IGetAllUsersRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await UserService.getAllUsers(req.query);
      res.json({
        usersData: result,
        cursor: result[result.length - 1]?.id_user || null,
      });
    } catch (e) {
      return next(e);
    }
  };

  static getUserTokens: RequestHandler<
    undefined,
    IGetUserTokensResponse[] | IErrorResponse,
    undefined,
    IGetUserTokensRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await UserService.getUserTokens(req.query);
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  //create
  static createUser: RequestHandler<
    undefined,
    ICreateUserResponse | IErrorResponse,
    ICreateUserRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const { refreshToken } = Tokenizator.generateTokens(req.body);
      const result = await UserService.createUser({
        ...req.body,
        refreshToken,
      });

      res.cookie("refreshToken", refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      res.status(201).json(result);
    } catch (e) {
      return next(e);
    }
  };

  //update
  static updateUserData: RequestHandler<
    undefined,
    IUpdateUserDataResponse | IErrorResponse,
    IUpdateUserDataRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await UserService.updateUserData(req.body);
      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  //delete
  static deleteUsers: RequestHandler<
    undefined,
    IDeleteUsersResponse | IErrorResponse,
    IDeleteUsersRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      const result = await UserService.deleteUsers(req.body);

      res.json(result);
    } catch (e) {
      return next(e);
    }
  };

  static deleteUser: RequestHandler<
    undefined,
    IDeleteUserResponse | IErrorResponse,
    IDeleteUserRequest
  > = async (req, res, next) => {
    const errorData = getValidationResult(req);
    if (errorData) return callUnprocessableEntity(next, errorData);

    try {
      await UserService.deleteUser(req.body);

      res.json({ count: 1 });
    } catch (e) {
      return next(e);
    }
  };
}
