import { Roles } from '../../enums'

export interface IUpdateUserTokenRequest {
	user_id: number
	device_id: string
	username: string
	role: keyof typeof Roles
}

export interface IUpdateUserTokenResponse {
	user_id: number
	device_id: string
	accessToken: string
	refreshToken: string
}
