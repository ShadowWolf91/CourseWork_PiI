import { Modes } from '../../../api/enums'
import { IGetSubjectsResponse } from '../../subjects/reg/getAllSubjects'

export interface ICreateThemeRequest {
	subject_id: number
	themeName: string
	mode: keyof typeof Modes
}

export interface ICreateThemeResponse {
	subject: IGetSubjectsResponse
	id_theme: number
	themeName: string
	mode: keyof typeof Modes
}
