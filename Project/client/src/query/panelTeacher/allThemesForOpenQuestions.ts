import { IGetThemesResponse } from '../../api/themes/reg/getAllThemes.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import ThemeEndpoints from '../../api/themes/endpoints.ts'
import { useQuery } from '@tanstack/react-query'

export const useGetThemes = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['getThemes'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetThemesResponse[],
					AxiosResponse<IGetThemesResponse[]>
				>(`${ThemeEndpoints.BASE}${ThemeEndpoints.GET_THEMES_OPEN_QUESTION}`, {
					withCredentials: false,
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
		isFetching,
	}
}

export default useGetThemes
