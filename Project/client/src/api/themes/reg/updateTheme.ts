import { Modes } from '../../../api/enums'

export interface IUpdateThemeRequest {
	themeId?: number
	themeName?: string
	mode?: keyof typeof Modes
}

export interface IUpdateThemeResponse {
	id_theme: number
	themeName: string
	mode: keyof typeof Modes
}
