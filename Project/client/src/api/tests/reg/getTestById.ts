export interface IGetTestByIdRequest {
	id_test: number
}

export interface IGetTestByIdResponse {
	id_test: number
	theme_id: number
	question: string
	optionA: string
	optionB: string
	optionC: string
	optionD: string
	correctAnswer: string
	testName: string
	statistic_id: number
}
