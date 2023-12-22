import { IGetAllOpenQuestionsResponse } from '../../api/openQuestions/reg/getAllOpenQuestions.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import OpenQuestionEndpoints from '../../api/openQuestions/endpoints.ts'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

export function useGetAllOpenQuestions(OpenQuestionName?: string) {
	return useInfiniteQuery<
		IGetAllOpenQuestionsResponse,
		IErrorResponse,
		InfiniteData<IGetAllOpenQuestionsResponse>,
		(string | undefined)[],
		{ pageSize: number | undefined; cursor: number | null }
	>({
		queryKey: ['openQuestions'],
		queryFn: async ({ pageParam }) => {
			try {
				const result = await $api.get<
					IGetAllOpenQuestionsResponse,
					AxiosResponse<IGetAllOpenQuestionsResponse>
				>(
					`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.GET_ALL_OPEN_QUESTIONS}`,
					{
						params: {
							skip: 0,
							take: pageParam?.pageSize || 25,
							cursor: pageParam?.cursor,
							OpenQuestionName,
						},
					}
				)
				return {
					openQuestionsData: result.data?.openQuestionsData,
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
			if (lastPage.openQuestionsData.length < 25) return
			return {
				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
				pageSize: 25,
			}
		},
		retry: false,
	})
}
