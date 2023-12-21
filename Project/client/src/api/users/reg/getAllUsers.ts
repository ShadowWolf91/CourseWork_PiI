import { Roles } from '../../enums'

export interface IGetAllUsersRequest {
	skip: number
	take: number
	cursor?: number
	username?: string
}

export interface IGetAllUsersResponse {
	usersData: {
		id_user: number
		username: string
		password: string
		role: keyof typeof Roles
		refreshToken: string
	}[]
	cursor: number | null
}