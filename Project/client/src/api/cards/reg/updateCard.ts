export interface IUpdateCardRequest {
	cardId: number
	word?: string
	correctAnswer?: string
	cardName?: string
	statistic_id?: number
}

export interface IUpdateCardResponse {
	cardId: number
	word: string
	correctAnswer: string
	cardName: string
	statistic_id: number
}
