import $api from '../axios/base.ts'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import {
	IGetCardByThemeIdRequest,
	IGetCardByThemeIdResponse,
} from '../../api/cards/reg/getByThemeId.ts'
import CardEndpoints from '../../api/cards/endpoints.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import { useParams } from 'react-router-dom'

export function useGetCards() {
	const { theme_id } = useParams()
	const { data, error, isLoading } = useQuery<
		IGetCardByThemeIdRequest,
		IErrorResponse,
		IGetCardByThemeIdResponse,
		['themeCard']
	>({
		queryKey: ['themeCard'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetCardByThemeIdResponse,
					AxiosResponse<IGetCardByThemeIdResponse>
				>(`${CardEndpoints.BASE}${CardEndpoints.GET_BY_THEME_ID}`, {
					params: {
						theme_id,
					},
				})
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		retry: false,
	})

	return {
		data,
		error,
		isLoading,
	}
}

export default useGetCards
