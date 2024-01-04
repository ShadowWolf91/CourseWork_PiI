import { Modes, Roles } from '../../enums'

export interface IGetAllStatisticsRequest {
	skip: number
	take: number
	cursor?: number
	title?: string
}

export interface IGetAllStatisticsResponse {
	statisticsData: {
		id: number
		rightAnswered: number
		mark: number
		statistics: {
			id: number
			rightAnswered: number
			mark: number
		}
		user: {
			id_user: number
			username: string
			password: string
			role: Roles
		}
		themes: {
			id_theme: number
			subject_id: number
			themeName: string
			mode: Modes
			time: number
		}
	}[]
	cursor: number | null
}
