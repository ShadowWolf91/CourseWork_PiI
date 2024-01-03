import $api from '../axios/base.ts'
import { IDeleteSubjectResponse } from '../../api/subjects/reg/deleteSubject.ts'
import SubjectEndpoints from '../../api/subjects/endpoints.ts'
import axios from 'axios'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'
import { IErrorResponse } from '../../api/errorResponse.ts'

export function useDropSubject() {
	const { mutateAsync: dropSubject } = useMutation<
		IDeleteSubjectResponse,
		IErrorResponse,
		number
	>({
		mutationFn: async id => {
			try {
				const result = await $api.delete<IDeleteSubjectResponse>(
					`${SubjectEndpoints.BASE}${SubjectEndpoints.DELETE}`,
					{
						data: {
							subjectId: [id],
						},
					}
				)
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
		},
	})
	return {
		dropSubject,
	}
}
