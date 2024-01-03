export interface IGetTestByThemeIdRequest {
	theme_id: number
}

export interface IGetTestByThemeIdResponse {
	theme_id: number
	test: {
		id_test: number
		question: string
		optionA: string
		optionB: string
		optionC: string
		optionD: string
		correctAnswer: string
	}[]
}
