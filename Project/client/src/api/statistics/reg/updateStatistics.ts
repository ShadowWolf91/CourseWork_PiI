export interface IUpdateStatisticRequest {
	id: number
	rightAnswered?: number
	mark?: number
}

export interface IUpdateStatisticResponse {
	id: number
	rightAnswered: number
	mark: number
}
