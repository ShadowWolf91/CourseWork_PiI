export interface IGetCardByThemeIdRequest {
	theme_id: number
}

export interface IGetCardByThemeIdResponse {
	theme_id: number
	card: {
		word: string
		correctAnswer: string
	}[]
}
