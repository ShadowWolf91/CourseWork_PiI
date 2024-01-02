import {
	ICreateOpenQuestionRequest,
	ICreateOpenQuestionResponse,
} from '../../api/openQuestions/reg/createOpenQuestion.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import OpenQuestionEndpoints from '../../api/openQuestions/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useCreateOpenQuestion() {
	return useMutation<
		ICreateOpenQuestionResponse,
		IErrorResponse,
		{ newOpenQuestion: ICreateOpenQuestionRequest }
	>({
		mutationFn: async ({ newOpenQuestion }) => {
			try {
				const result = await $api.post<
					ICreateOpenQuestionResponse,
					AxiosResponse<ICreateOpenQuestionResponse>,
					ICreateOpenQuestionRequest
				>(`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.CREATE}`, {
					theme_id: newOpenQuestion.theme_id,
					question: newOpenQuestion.question,
					correctAnswer: newOpenQuestion.correctAnswer,
					openQuestionName: newOpenQuestion.openQuestionName,
					statistic_id: newOpenQuestion.statistic_id,
				})
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
}
