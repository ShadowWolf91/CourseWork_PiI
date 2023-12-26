import { IGetAllTestsResponse } from '../../api/tests/reg/getAllTests.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import TestEndpoints from '../../api/tests/endpoints.ts'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

export function useGetAllTests(TestName?: string) {
	return useInfiniteQuery<
		IGetAllTestsResponse,
		IErrorResponse,
		InfiniteData<IGetAllTestsResponse>,
		(string | undefined)[],
		{ pageSize: number | undefined; cursor: number | null }
	>({
		queryKey: ['Tests'],
		queryFn: async ({ pageParam }) => {
			try {
				const result = await $api.get<
					IGetAllTestsResponse,
					AxiosResponse<IGetAllTestsResponse>
				>(`${TestEndpoints.BASE}${TestEndpoints.GET_ALL_TESTS}`, {
					params: {
						skip: 0,
						take: Number(pageParam?.pageSize) || 25,
						cursor: pageParam?.cursor,
						TestName,
					},
				})
				return {
					testsData: result.data?.testsData,
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
			if (lastPage.testsData.length < 25) return
			return {
				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
				pageSize: 25,
			}
		},
		retry: false,
	})
}
