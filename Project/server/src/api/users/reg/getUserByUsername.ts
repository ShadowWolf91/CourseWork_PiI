import { Roles } from '../../enums'

export interface IGetUserByUsernameRequest {
	username: string
}

export interface IGetUserByUsernameResponse {
	id_user: number
	username: string
	password: string
	role: keyof typeof Roles
	token: string
}