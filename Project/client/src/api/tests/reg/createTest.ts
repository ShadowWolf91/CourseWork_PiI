import { IGetThemesResponse } from '../../themes/reg/getAllThemes'

export interface ICreateTestRequest {
	theme_id: number
	question: string
	optionA: string
	optionB: string
	optionC: string
	optionD: string
	correctAnswer: string
	testName: string
	statistic_id: number
}

export interface ICreateTestResponse {
	theme: IGetThemesResponse
	id_test: number
	question: string
	optionA: string
	optionB: string
	optionC: string
	optionD: string
	correctAnswer: string
	testName: string
	statistic_id: number
}
