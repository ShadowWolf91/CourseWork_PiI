export interface IGetAllSubjectsRequest {
	subjectName?: string
	skip: number
	take: number
	cursor?: number
}

export interface IGetAllSubjectsResponse {
	subjectsData: {
		id_subject: number
		subjectName: string
	}[]
	cursor: number | null
}
