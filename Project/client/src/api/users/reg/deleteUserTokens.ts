export interface IDeleteUserTokensRequest {
	user_id: number
	device_id: string[]
}

export interface IDeleteUserTokensResponse {
	count: number
}
