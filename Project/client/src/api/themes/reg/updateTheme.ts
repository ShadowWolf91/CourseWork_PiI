import { Modes } from '../../../api/enums'

export interface IUpdateThemeRequest {
	subject_id?: number
	themeName?: string
	mode?: keyof typeof Modes
}

export interface IUpdateThemeResponse {
	id_theme: number
	subject_id: number
	themeName: string
	mode: keyof typeof Modes
}
