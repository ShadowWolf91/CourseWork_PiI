export interface IGetStatisticByUserIdRequest {
	ids: number[]
}

export interface IGetStatisticByUserIdResponse {
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
