import {
	ICreateSubjectRequest,
	ICreateSubjectResponse,
} from '../../api/subjects/reg/createSubject.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import SubjectEndpoints from '../../api/subjects/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useCreateSubject() {
	return useMutation<ICreateSubjectResponse, IErrorResponse, ICreateSubjectRequest>({
		mutationFn: async newSubject => {
			try {
				const result = await $api.post<
					ICreateSubjectResponse,
					AxiosResponse<ICreateSubjectResponse>,
					ICreateSubjectRequest
				>(`${SubjectEndpoints.BASE}${SubjectEndpoints.CREATE}`, {
					subjectName: newSubject.subjectName,
				})
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['subjects'],
			})
			// await queryClient.invalidateQueries({
			// 	queryKey: ['themes'],
			// })
		},
	})
}
