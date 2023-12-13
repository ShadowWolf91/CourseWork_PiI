import { Roles } from '../../enums'

export interface ILoginUserRequest {
	username: string
	password: string
}

export interface ILoginUserResponse {
	id_user: number
	token: string
	role: keyof typeof Roles
	username: string
}