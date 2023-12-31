import $api from '../axios/base.ts'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { IGetBySubjectIdResponse } from '../../api/themes/reg/getBySubjectId.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import ThemesEndpoints from '../../api/themes/endpoints.ts'

export function useGetThemes(subject_id: string | null) {
	return useQuery<
		IGetBySubjectIdResponse,
		IErrorResponse,
		IGetBySubjectIdResponse,
		string[]
	>({
		queryKey: ['getThemes'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetBySubjectIdResponse,
					AxiosResponse<IGetBySubjectIdResponse>
				>(`${ThemesEndpoints.BASE}${ThemesEndpoints.GET_BY_SUBJECT_ID}`, {
					params: {
						subject_id: +subject_id!,
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
		refetchOnWindowFocus: true,
		retry: false,
		enabled: !!subject_id,
	}
}

export default useGetThemes
