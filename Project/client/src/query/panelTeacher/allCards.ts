import { IGetAllCardsResponse } from '../../api/cards/reg/getAllCards.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import CardEndpoints from '../../api/cards/endpoints.ts'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

export function useGetAllCards(CardName?: string) {
	return useInfiniteQuery<
		IGetAllCardsResponse,
		IErrorResponse,
		InfiniteData<IGetAllCardsResponse>,
		(string | undefined)[],
		{ pageSize: number | undefined; cursor: number | null }
	>({
		queryKey: ['Cards'],
		queryFn: async ({ pageParam }) => {
			try {
				const result = await $api.get<
					IGetAllCardsResponse,
					AxiosResponse<IGetAllCardsResponse>
				>(`${CardEndpoints.BASE}${CardEndpoints.GET_ALL_CARDS}`, {
					params: {
						skip: 0,
						take: Number(pageParam?.pageSize) || 25,
						cursor: pageParam?.cursor,
						CardName,
					},
				})
				return {
					cardsData: result.data?.cardsData,
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
			if (lastPage.cardsData.length < 25) return
			return {
				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
				pageSize: 25,
			}
		},
		retry: false,
	})
}
