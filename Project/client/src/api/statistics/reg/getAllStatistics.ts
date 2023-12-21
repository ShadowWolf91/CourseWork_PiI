export interface IGetAllStatisticsRequest {
	skip: number
	take: number
	cursor?: number
	title?: string
}

export interface IGetAllStatisticsResponse {
	statisticsData: {
		id_statistics: number
		rightAnswered: number
		score: number
		mark: number
		user_id: number
		title: string
	}[]
	cursor: number | null
}
