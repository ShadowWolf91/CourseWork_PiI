import { IGetAllThemesResponse } from '../../api/themes/reg/getAllThemes.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import ThemeEndpoints from '../../api/themes/endpoints.ts'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

export function useGetAllThemes(themeName?: string) {
	return useInfiniteQuery<
		IGetAllThemesResponse,
		IErrorResponse,
		InfiniteData<IGetAllThemesResponse>,
		(string | undefined)[],
		{ pageSize: number | undefined; cursor: number | null }
	>({
		queryKey: ['themes'],
		queryFn: async ({ pageParam }) => {
			try {
				const result = await $api.get<
					IGetAllThemesResponse,
					AxiosResponse<IGetAllThemesResponse>
				>(`${ThemeEndpoints.BASE}${ThemeEndpoints.GET_ALL_THEMES}`, {
					params: {
						skip: 0,
						take: Number(pageParam?.pageSize) || 25,
						cursor: pageParam?.cursor,
						themeName,
					},
				})
				return {
					themesData: result.data?.themesData,
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
			if (lastPage.themesData.length < 25) return
			return {
				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
				pageSize: 25,
			}
		},
		retry: false,
	})
}
