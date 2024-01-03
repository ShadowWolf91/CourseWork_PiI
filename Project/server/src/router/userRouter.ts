import { Router } from "express";
import { body, query } from "express-validator";
import UserEndpoints from "../api/users/endpoints";
import UserController from "../controllers/userController";
//import authMiddleware from "../mid/auth";
import UserDataValidator from "../validators/userValidator";

const userRouter = Router();

userRouter.post(
  UserEndpoints.USERNAME,
  UserDataValidator.username(body, false, { max: 30, min: 4 }),
  UserDataValidator.password(body, false, { max: 120, min: 8 }),
  UserDataValidator.device_id(body),
  UserController.loginUser
);

userRouter.get(
  UserEndpoints.GET_USER_BY_USERNAME,
  UserDataValidator.username(query),
  UserController.getUserByUsername
);

userRouter.get(
  UserEndpoints.GET_ALL_USERS,
  UserDataValidator.take(query),
  UserDataValidator.skip(query),
  UserDataValidator.username(query, true),
  UserDataValidator.cursor(query),
  UserController.getAllUsers
);

userRouter.get(
  UserEndpoints.GET_USER_TOKENS,
  UserDataValidator.user_id(query),
  UserController.getUserTokens
);

userRouter.post(
  UserEndpoints.CREATE_USER,
  UserDataValidator.username(body, false, { max: 30, min: 4 }),
  UserDataValidator.password(body, false, { max: 120, min: 8 }),
  UserDataValidator.role(body),
  UserController.createUser
);

userRouter.post(
  UserEndpoints.CREATE_USER_TOKEN,
  UserDataValidator.user_id(body),
  UserDataValidator.device_id(body),
  UserController.createUserToken
);

userRouter.patch(
  UserEndpoints.UPDATE_USER_DATA,
  // UserDataValidator.user_id(body),
  UserDataValidator.username(body, true, { max: 30 }),
  UserDataValidator.password(body, true, { max: 120 }),
  UserController.updateUserData
);

userRouter.patch(
  UserEndpoints.UPDATE_USER_TOKEN,
  UserDataValidator.user_id(body),
  UserDataValidator.device_id(body),
  UserDataValidator.username(body, false, { max: 30 }),
  UserController.updateUserToken
);

userRouter.delete(
  UserEndpoints.DELETE_USERS,
  UserDataValidator.ids(body, "userIds"),
  UserController.deleteUsers
);

userRouter.delete(
  UserEndpoints.DELETE_USER,
  UserDataValidator.user_id(body),
  UserController.deleteUser
);

userRouter.delete(
  UserEndpoints.DELETE_USER_TOKENS,
  UserDataValidator.user_id(body),
  UserDataValidator.device_id(body, true),
  UserDataValidator.device_idArrayEntries(body),
  UserController.deleteUserTokens
);

export default userRouter;
