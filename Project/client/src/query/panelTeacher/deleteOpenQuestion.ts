import $api from '../axios/base.ts'
import { IDeleteOpenQuestionResponse } from '../../api/openQuestions/reg/deleteOpenQuestion.ts'
import OpenQuestionEndpoints from '../../api/openQuestions/endpoints.ts'
import axios from 'axios'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'
import { IErrorResponse } from '../../api/errorResponse.ts'

export function useDropOpenQuestion() {
	const { mutateAsync: dropOpenQuestion } = useMutation<
		IDeleteOpenQuestionResponse,
		IErrorResponse,
		number
	>({
		mutationFn: async id_openQuestion => {
			try {
				const result = await $api.delete<IDeleteOpenQuestionResponse>(
					`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.DELETE}`,
					{
						data: {
							openQuestionId: [id_openQuestion],
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
				queryKey: ['openQuestions'],
			})
		},
	})
	return {
		dropOpenQuestion,
	}
}
