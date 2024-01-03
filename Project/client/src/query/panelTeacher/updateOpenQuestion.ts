import {
	IUpdateOpenQuestionRequest,
	IUpdateOpenQuestionResponse,
} from '../../api/openQuestions/reg/updateOpenQuestion.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import OpenQuestionEndpoints from '../../api/openQuestions/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useUpdateOpenQuestion() {
	return useMutation<
		IUpdateOpenQuestionResponse,
		IErrorResponse,
		IUpdateOpenQuestionRequest
	>({
		mutationFn: async selectedOpenQuestion => {
			try {
				const result = await $api.patch<
					IUpdateOpenQuestionResponse,
					AxiosResponse<IUpdateOpenQuestionResponse>,
					IUpdateOpenQuestionRequest
				>(`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.UPDATE}`, {
					openQuestionId: selectedOpenQuestion.openQuestionId,
					theme_id: selectedOpenQuestion?.theme_id,
					question: selectedOpenQuestion?.question,
					correctAnswer: selectedOpenQuestion?.correctAnswer,
					openQuestionName: selectedOpenQuestion?.openQuestionName,
					statistic_id: selectedOpenQuestion?.statistic_id,
				})
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['OpenQuestions'],
			})
		},
	})
}
