import { ICreateSubjectRequest } from '../api/subjects/reg/createSubject'
import { IDeleteSubjectRequest } from '../api/subjects/reg/deleteSubject'
import { IUpdateSubjectRequest } from '../api/subjects/reg/updateSubject'
import {
	IGetSubjectBySubjectIdRequest,
	IGetSubjectBySubjectIdResponse,
} from '../api/subjects/reg/getSubjectBySubjectId'
import UserRequestError from '../errors/userRequestError'
import prismaClient from '../prismaClient'

export default class SubjectService {
	//get
	static getSubjectById = async ({
		id_subject,
	}: IGetSubjectBySubjectIdRequest): Promise<IGetSubjectBySubjectIdResponse> => {
		const subject = await prismaClient.subjects.findUnique({
			where: { id_subject },
		})
		if (!subject)
			throw UserRequestError.NotFound(
				`SUBJECT WITH ID ${id_subject} NOT FOUND`
			)

		return {
			...subject,
		}
	}

	//create
	static createSubject = async ({
		id_subject,
		subjectName,
	}: ICreateSubjectRequest) => {
		const subject = await prismaClient.subjects.findUnique({
			where: { id_subject },
			select: { id_subject: true },
		})

        if (!subject)
        throw UserRequestError.NotFound(`SUBJECT WITH ID ${id_subject} CREATED`)

		return prismaClient.subjects.create({
			data: {
				subjectName,
			},
		})
	}

	//update
	static updateSubject = async ({
		id_subject,
		subjectName,
	}: IUpdateSubjectRequest) => {
		const subject = await prismaClient.subjects.findUnique({
			where: { id_subject },
			select: { id_subject: true },
		})
		if (!subject)
			throw UserRequestError.NotFound(`SUBJECT WITH ID ${id_subject} NOT FOUND`)

		return prismaClient.subjects.update({
			where: { id_subject },
			data: {
				subjectName,
			},
		})
	}

	//delete
	static deleteSubject = async ({ id_subject }: IDeleteSubjectRequest) => {
		const subject = await prismaClient.subjects.findUnique({
			where: { id_subject: id_subject },
			select: { id_subject: true },
		})

		if (!subject)
			throw UserRequestError.NotFound(
				`SUBJECT WITH ID ${id_subject} NOT FOUND`
			)

		return prismaClient.subjects.delete({
			where: { id_subject: id_subject },
		})
	}
}