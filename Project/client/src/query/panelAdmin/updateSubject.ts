import {
	IUpdateSubjectRequest,
	IUpdateSubjectResponse,
} from '../../api/subjects/reg/updateSubject.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import SubjectEndpoints from '../../api/subjects/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useUpdateSubject() {
	return useMutation<IUpdateSubjectResponse, IErrorResponse, IUpdateSubjectRequest>({
		mutationFn: async selectedSubject => {
			try {
				const result = await $api.patch<
					IUpdateSubjectResponse,
					AxiosResponse<IUpdateSubjectResponse>,
					IUpdateSubjectRequest
				>(`${SubjectEndpoints.BASE}${SubjectEndpoints.UPDATE}`, {
					id_subject: selectedSubject.id_subject,
					subjectName: selectedSubject?.subjectName,
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
			await queryClient.invalidateQueries({
				queryKey: ['themes'],
			})
		},
	})
}
