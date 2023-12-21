import { Modes } from '../../enums'

export interface ICreateThemeRequest {
	subject_id: number
	themeName: string
	mode: keyof typeof Modes
	questionAmount: number
}

export interface ICreateThemeResponse {
	id_theme: number
	subject_id: number
	themeName: string
	mode: keyof typeof Modes
	questionAmount: number
}
