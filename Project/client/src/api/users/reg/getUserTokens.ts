export interface IGetUserTokensRequest {
	id_user: number
}

export interface IGetUserTokensResponse {
	id_user: number
	refreshToken: string
}
