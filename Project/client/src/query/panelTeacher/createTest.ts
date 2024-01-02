import {
	ICreateTestRequest,
	ICreateTestResponse,
} from '../../api/tests/reg/createTest.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import TestEndpoints from '../../api/tests/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useCreateTest() {
	return useMutation<
		ICreateTestResponse,
		IErrorResponse,
		{ newTest: ICreateTestRequest }
	>({
		mutationFn: async ({ newTest }) => {
			try {
				const result = await $api.post<
					ICreateTestResponse,
					AxiosResponse<ICreateTestResponse>,
					ICreateTestRequest
				>(`${TestEndpoints.BASE}${TestEndpoints.CREATE}`, {
					theme_id: newTest.theme_id,
					question: newTest.question,
					optionA: newTest.optionA,
					optionB: newTest.optionB,
					optionC: newTest.optionC,
					optionD: newTest.optionD,
					correctAnswer: newTest.correctAnswer,
					testName: newTest.testName,
					statistic_id: newTest.statistic_id,
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
