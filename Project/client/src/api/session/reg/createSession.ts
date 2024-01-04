export interface ICreateSessionRequest {
	themeId: number
	userId: number
}

export interface ICreateSessionResponse {
	id: number
	userId: number
	statisticId: number
	themeId: number
}
