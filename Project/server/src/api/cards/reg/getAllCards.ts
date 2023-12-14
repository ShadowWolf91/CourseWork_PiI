export interface IGetAllCardsRequest {
	skip: number
	take: number
	cursor?: number
	cardName?: string
}

export interface IGetAllCardsResponse {
	cardsData: {
		id_card: number
		theme_id: number
		word: string
		correctAnswer: string
		timeAmount: Date
		cardName: string
	}[]
	cursor: number | null
}