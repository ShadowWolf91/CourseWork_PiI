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
					id: selectedStatistic.id,
					rightAnswered: selectedStatistic?.rightAnswered,
					mark: selectedStatistic?.mark,
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
