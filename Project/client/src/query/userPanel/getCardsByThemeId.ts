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

export const useGetCards = () => {
	const { theme_id } = useParams()
	const { data, error, isLoading } = useQuery<
		IGetCardByThemeIdRequest,
		IErrorResponse,
		IGetCardByThemeIdResponse,
		['theme']
	>({
		queryKey: ['theme'],
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
				if (axios.isAxiosError(e)) return e?.response?.data
				return e
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
