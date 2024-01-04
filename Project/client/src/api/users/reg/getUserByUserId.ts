import { Roles } from '../../enums'

export interface IGetUserByIdRequest {
	id_user: number
}

export interface IGetUserByIdResponse {
	id_user: number
	username: string
	password: string
	role: keyof typeof Roles
}
