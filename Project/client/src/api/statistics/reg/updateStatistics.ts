export interface IUpdateStatisticRequest {
	id_statistics: number
	rightAnswered?: number
	score?: number
	mark?: number
	user_id?: number
	title?: string
}

export interface IUpdateStatisticResponse {
	id_statistics: number
	rightAnswered: number
	score: number
	mark: number
	user_id: number
	title: string
}
