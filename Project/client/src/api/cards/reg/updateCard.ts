export interface IUpdateCardRequest {
	id_card: number
	theme_id?: number
	word?: string
	correctAnswer?: string
	cardName?: string
	statistic_id?: number
}

export interface IUpdateCardResponse {
	id_card: number
	theme_id: number
	word: string
	correctAnswer: string
	cardName: string
	statistic_id: number
}