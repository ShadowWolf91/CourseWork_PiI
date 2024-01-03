import $api from '../axios/base.ts'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import {
	IGetTestByThemeIdRequest,
	IGetTestByThemeIdResponse,
} from '../../api/tests/reg/getByThemeId.ts'
import TestEndpoints from '../../api/tests/endpoints.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import { useParams } from 'react-router-dom'

export const useGetTests = () => {
	const { theme_id } = useParams()
	const { data, error, isLoading } = useQuery<
		IGetTestByThemeIdRequest,
		IErrorResponse,
		IGetTestByThemeIdResponse,
		['themeTest']
	>({
		queryKey: ['themeTest'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetTestByThemeIdResponse,
					AxiosResponse<IGetTestByThemeIdResponse>
				>(`${TestEndpoints.BASE}${TestEndpoints.GET_BY_THEME_ID}`, {
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

export default useGetTests
