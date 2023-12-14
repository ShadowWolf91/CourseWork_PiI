export interface IUpdateCardRequest {
	id_card: number
	theme_id: number
	word: string
	correctAnswer: string
	timeAmount: Date
	cardName: string
}

export interface IUpdateCardResponse {
	id_card: number
	theme_id: number
	word: string
	correctAnswer: string
	timeAmount: Date
	cardName: string
}