import {
	IUpdateTestRequest,
	IUpdateTestResponse,
} from '../../api/tests/reg/updateTest.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import TestEndpoints from '../../api/tests/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useUpdateTest() {
	return useMutation<IUpdateTestResponse, IErrorResponse, IUpdateTestRequest>({
		mutationFn: async selectedTest => {
			try {
				const result = await $api.patch<
					IUpdateTestResponse,
					AxiosResponse<IUpdateTestResponse>,
					IUpdateTestRequest
				>(`${TestEndpoints.BASE}${TestEndpoints.UPDATE}`, {
					testId: selectedTest.testId,
					theme_id: selectedTest?.theme_id,
					question: selectedTest?.question,
					optionA: selectedTest?.optionA,
					optionB: selectedTest?.optionB,
					optionC: selectedTest?.optionC,
					optionD: selectedTest?.optionD,
					correctAnswer: selectedTest?.correctAnswer,
					testName: selectedTest?.testName,
					statistic_id: selectedTest?.statistic_id,
				})
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['tests'],
			})
		},
	})
}
