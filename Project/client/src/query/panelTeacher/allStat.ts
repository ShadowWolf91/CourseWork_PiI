import { IGetAllStatisticsResponse } from '../../api/statistics/reg/getAllStatistics.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import CardEndpoints from '../../api/statistics/endpoints.ts'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

export function useGetAllStats(title?: string) {
	return useInfiniteQuery<
		IGetAllStatisticsResponse,
		IErrorResponse,
		InfiniteData<IGetAllStatisticsResponse>,
		(string | undefined)[],
		{ pageSize: number | undefined; cursor: number | null }
	>({
		queryKey: ['statistics'],
		queryFn: async ({ pageParam }) => {
			try {
				const result = await $api.get<
					IGetAllStatisticsResponse,
					AxiosResponse<IGetAllStatisticsResponse>
				>(`${CardEndpoints.BASE}${CardEndpoints.GET_ALL_STATISTICS}`, {
					params: {
						skip: 0,
						take: Number(pageParam?.pageSize) || 25,
						cursor: pageParam?.cursor,
						title,
					},
				})
				return {
					statisticsData: result.data?.statisticsData,
					cursor: result.data?.cursor,
				}
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		refetchOnWindowFocus: false,
		initialPageParam: { pageSize: 25, cursor: null },
		getNextPageParam: lastPage => {
			if (lastPage.statisticsData.length < 25) return
			return {
				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
				pageSize: 25,
			}
		},
		retry: false,
	})
}
