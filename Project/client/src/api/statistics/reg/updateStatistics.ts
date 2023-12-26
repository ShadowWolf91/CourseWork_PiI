export interface IUpdateStatisticRequest {
	id_statistics: number
	rightAnsweredTests?: number
	rightAnsweredOQs?: number
	rightAnsweredCards?: number
	markTests?: number
	markCards?: number
	markOpenQuestions?: number
	user_id?: number
	title?: string
}

export interface IUpdateStatisticResponse {
	id_statistics: number
	rightAnsweredTests: number
	rightAnsweredOQs: number
	rightAnsweredCards: number
	markTests: number
	markCards: number
	markOpenQuestions: number
	user_id: number
	title: string
}
