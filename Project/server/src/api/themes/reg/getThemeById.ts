export interface IGetThemeByIdRequest {
    id_theme: number
}

export interface IGetThemeByIdResponse {
	id_theme: number
	subject_id: number
	themeName: string
}