import { AxiosResponse, isAxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { IGetCardByThemeIdResponse } from '../../api/cards/reg/getByThemeId.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import CardsEndpoints from '../../api/cards/endpoints.ts'

export function useGetCards(theme_id: string | null) {
	return useQuery<
		IGetCardByThemeIdResponse,
		IErrorResponse,
		IGetCardByThemeIdResponse,
		string[]
	>({
		queryKey: ['cards'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetCardByThemeIdResponse,
					AxiosResponse<IGetCardByThemeIdResponse>
				>(`${CardsEndpoints.BASE}${CardsEndpoints.GET_BY_THEME_ID}`, {
					params: {
						theme_id: +theme_id!,
					},
				})
				return result.data
			} catch (e) {
				if (isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		refetchOnWindowFocus: true,
		retry: false,
		enabled: !!theme_id,
	})
}
