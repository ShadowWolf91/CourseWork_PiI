import { ThemeData } from '../common'

export interface IGetBySubjectIdRequest {
	subject_id: number
}

export interface IGetBySubjectIdResponse {
	subject_id: number
	themes: ThemeData[]
}
