import { Modes } from 'api/enums'

export interface IUpdateThemeRequest {
	id_theme: number
	subject_id: number
	themeName: string
	mode : keyof typeof Modes
	questionAmount : number
}

export interface IUpdateThemeResponse {
	id_theme: number
	subject_id: number
	themeName: string
	mode : keyof typeof Modes
	questionAmount : number
}