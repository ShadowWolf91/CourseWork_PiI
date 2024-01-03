import $api from '../axios/base.ts'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import {
	IGetOpenQuestionByThemeIdRequest,
	IGetOpenQuestionByThemeIdResponse,
} from '../../api/openQuestions/reg/getByThemeId.ts'
import OpenQuestionEndpoints from '../../api/openQuestions/endpoints.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import { useParams } from 'react-router-dom'

export const useGetOpenQuestion = () => {
	const { theme_id } = useParams()
	const { data, error, isLoading } = useQuery<
		IGetOpenQuestionByThemeIdRequest,
		IErrorResponse,
		IGetOpenQuestionByThemeIdResponse,
		['themeOpenQuestion']
	>({
		queryKey: ['themeOpenQuestion'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetOpenQuestionByThemeIdResponse,
					AxiosResponse<IGetOpenQuestionByThemeIdResponse>
				>(`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.GET_BY_THEME_ID}`, {
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

export default useGetOpenQuestion
