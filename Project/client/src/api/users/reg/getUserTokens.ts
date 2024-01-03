export interface IGetUserTokensRequest {
	user_id: number
}

export interface IGetUserTokensResponse {
	user_id: number
	device_id: string
	refreshToken: string
}
