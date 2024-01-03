export interface IGetOpenQuestionByIdRequest {
	id_openQuestion: number
}

export interface IGetOpenQuestionByIdResponse {
	id_openQuestion: number
	theme_id: number
	question: string
	correctAnswer: string
	openQuestionName: string
	statistic_id: number
}
