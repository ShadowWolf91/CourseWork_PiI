export interface IUpdateTestRequest {
	testId: number
	theme_id?: number
	question?: string
	optionA?: string
	optionB?: string
	optionC?: string
	optionD?: string
	correctAnswer?: string
	testName?: string
	statistic_id?: number
}

export interface IUpdateTestResponse {
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
