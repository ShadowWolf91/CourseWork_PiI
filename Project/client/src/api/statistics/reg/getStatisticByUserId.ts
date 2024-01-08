// import { StatData } from '../common'

import { Modes } from '../../enums'

export interface IGetStatisticByUserIdRequest {
	id_user: number
}

export interface IGetStatisticByUserIdResponse {
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
		}
		theme: {
			id_theme: number
			subject_id: number
			themeName: string
			mode: Modes
			time: number
		}
	}[]
}
