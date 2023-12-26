import {
	IUpdateStatisticRequest,
	IUpdateStatisticResponse,
} from '../../api/statistics/reg/updateStatistics.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import StatisticsEndpoints from '../../api/statistics/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useUpdateStat() {
	return useMutation<IUpdateStatisticResponse, IErrorResponse, IUpdateStatisticRequest>({
		mutationFn: async selectedStatistic => {
			try {
				const result = await $api.patch<
					IUpdateStatisticResponse,
					AxiosResponse<IUpdateStatisticResponse>,
					IUpdateStatisticRequest
				>(`${StatisticsEndpoints.BASE}${StatisticsEndpoints.UPDATE}`, {
					id_statistics: selectedStatistic.id_statistics,
					rightAnsweredTests: selectedStatistic?.rightAnsweredTests,
					rightAnsweredOQs: selectedStatistic?.rightAnsweredOQs,
					rightAnsweredCards: selectedStatistic?.rightAnsweredCards,
					markTests: selectedStatistic?.markTests,
					markCards: selectedStatistic?.markCards,
					markOpenQuestions: selectedStatistic?.markOpenQuestions,
					title: selectedStatistic.title,
					user_id: selectedStatistic?.user_id,
				})
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['Statistics'],
			})
		},
	})
}
