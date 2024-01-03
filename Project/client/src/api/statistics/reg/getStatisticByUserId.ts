export interface IGetStatisticByUserIdRequest {
	ids: number[]
}

export interface IGetStatisticByUserIdResponse {
	id_statistics: number
	rightAnswered: number
	mark: number
}
