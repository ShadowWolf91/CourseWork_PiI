import { Router } from 'express'
//import { body, cookie, query } from 'express-validator'
import UserEndpoints from '../api/users/endpoints'
import UserController from '../controllers/userController'
import authMiddleware from '../mid/auth'

const userRouter = Router()

userRouter.post(
	UserEndpoints.LOGIN,
	// UserDataValidator.login(query, false, { max: 30 }),
	// UserDataValidator.password(query, false, { max: 120 }),
	// UserDataValidator.deviceId(query),
	UserController.loginUser
)

userRouter.get(
	UserEndpoints.GET_USER_BY_LOGIN,
	// UserDataValidator.login(query),
	authMiddleware,
	UserController.getUserByLogin
)

userRouter.get(
	UserEndpoints.GET_ALL_USERS,
	// UserDataValidator.take(query),
	// UserDataValidator.skip(query),
	// UserDataValidator.login(query, true),
	// UserDataValidator.cursor(query),
	UserController.getAllUsers
)

userRouter.get(
	UserEndpoints.GET_USER_TOKENS,
	// UserDataValidator.userId(query),
	UserController.getUserTokens
)

userRouter.post(
	UserEndpoints.CREATE_USER,
	// UserDataValidator.login(body, false, { max: 30 }),
	// UserDataValidator.password(body, false, { max: 120 }),
	// UserDataValidator.role(body),
	UserController.createUser
)

userRouter.patch(
	UserEndpoints.UPDATE_USER_DATA,
	// UserDataValidator.userId(body),
	// UserDataValidator.login(body, true, { max: 30 }),
	// UserDataValidator.password(body, true, { max: 120 }),
	// UserDataValidator.isArchived(body),
	// UserDataValidator.isBanned(body),
	UserController.updateUserData
)

userRouter.delete(
	UserEndpoints.DELETE_USERS,
	// UserDataValidator.ids(body, 'userIds'),
	UserController.deleteUsers
)

export default userRouter