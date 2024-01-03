export interface ICreateSessionRequest {
	themeId: number
	userId: number
}

export interface ICreateSessionResponse {
	id: number
	userId: number
	statistic_id: number
	themeId: number
}
