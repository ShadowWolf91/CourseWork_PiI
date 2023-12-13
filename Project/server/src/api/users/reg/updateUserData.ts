import { Roles } from '../../enums'

export interface IUpdateUserDataRequest {
	id_user: number
	username?: string
	password?: string
	role?: keyof typeof Roles
}

export interface IUpdateUserDataResponse {
	id_user: number
	username: string
	password: string
	role: keyof typeof Roles
}