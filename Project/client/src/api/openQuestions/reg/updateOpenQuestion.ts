export interface IUpdateOpenQuestionRequest {
	openQuestionId: number
	theme_id?: number
	question?: string
	correctAnswer?: string
	openQuestionName?: string
	statistic_id?: number
}

export interface IUpdateOpenQuestionResponse {
	theme_id: number
	question: string
	correctAnswer: string
	openQuestionName: string
	statistic_id: number
}
