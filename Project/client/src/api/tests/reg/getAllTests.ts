export interface IGetAllTestsRequest {
	skip: number
	take: number
	cursor?: number
	testName?: string
}

export interface IGetAllTestsResponse {
	testsData: {
		id_test: number
		theme_id: number
		question: string
		optionA: string
		optionB: string
		optionC: string
		optionD: string
		correctAnswer: string
		testName: string
		statistic_id: number
	}[]
	cursor: number | null
}
