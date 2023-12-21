import { Roles } from '../../enums'

export interface ICreateUserRequest {
	username: string
	password: string
	role?: keyof typeof Roles
	refreshToken?: string
}

export interface ICreateUserResponse {
	id_user: number
	username: string
	password: string
	role: keyof typeof Roles
	refreshToken: string
}