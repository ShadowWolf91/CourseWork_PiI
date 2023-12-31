import { Modes } from '../../../api/enums'

export interface IGetAllThemesRequest {
	skip: number
	take: number
	cursor?: number
	themeName?: string
}

export interface IGetAllThemesResponse {
	themesData: {
		id_theme: number
		subject_id: number
		themeName: string
		mode: keyof typeof Modes
		questionAmount: number
		time: number
	}[]
	cursor: number | null
}
