import $api from '../axios/base.ts'
import { IDeleteThemeResponse } from '../../api/themes/reg/deleteTheme.ts'
import ThemeEndpoints from '../../api/themes/endpoints.ts'
import axios from 'axios'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'
import { IErrorResponse } from '../../api/errorResponse.ts'

export function useDropTheme() {
	const { mutateAsync: dropTheme } = useMutation<
		IDeleteThemeResponse,
		IErrorResponse,
		number
	>({
		mutationFn: async id => {
			try {
				const result = await $api.delete<IDeleteThemeResponse>(
					`${ThemeEndpoints.BASE}${ThemeEndpoints.DELETE}`,
					{
						data: {
							themeId: [id],
						},
					}
				)
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['themes'],
			})
		},
	})
	return {
		dropTheme,
	}
}
