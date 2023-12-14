export interface ICreateCardRequest {
	login: string
	password: string
}

export interface ICreateCardResponse {
	id: number
	login: string
	password: string
	isArchived: boolean
	isBanned: boolean
	createdAt: Date
	card: {
		userId: number
		deviceId: string
		refreshToken: string
	}[]
}