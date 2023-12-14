export interface ICreateCardRequest {
	theme_id: number
	word: string
	correctAnswer: string
	timeAmount: Date
	cardName: string
}

export interface ICreateCardResponse {
	id_card: number
	theme_id: number
	word: string
	correctAnswer: string
	timeAmount: Date
	cardName: string
}