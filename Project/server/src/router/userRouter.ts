import { Router } from "express";
import UserEndpoints from "../api/users/endpoints";
import UserController from "../controllers/userController";
import authMiddleware from "../mid/auth";

const userRouter = Router();

userRouter.post(UserEndpoints.USERNAME, UserController.loginUser);

userRouter.get(
  UserEndpoints.GET_USER_BY_USERNAME,
  authMiddleware,
  UserController.getUserByLogin
);

userRouter.get(UserEndpoints.GET_ALL_USERS, UserController.getAllUsers);

userRouter.get(UserEndpoints.GET_USER_TOKENS, UserController.getUserTokens);

userRouter.post(UserEndpoints.CREATE_USER, UserController.createUser);

userRouter.patch(UserEndpoints.UPDATE_USER_DATA, UserController.updateUserData);

userRouter.delete(UserEndpoints.DELETE_USERS, UserController.deleteUsers);

userRouter.delete(UserEndpoints.DELETE_USER, UserController.deleteUser);

export default userRouter;
