import {
	IUpdateThemeRequest,
	IUpdateThemeResponse,
} from '../../api/themes/reg/updateTheme.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import ThemeEndpoints from '../../api/themes/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useUpdateTheme() {
	return useMutation<IUpdateThemeResponse, IErrorResponse, IUpdateThemeRequest>({
		mutationFn: async selectedTheme => {
			try {
				const result = await $api.patch<
					IUpdateThemeResponse,
					AxiosResponse<IUpdateThemeResponse>,
					IUpdateThemeRequest
				>(`${ThemeEndpoints.BASE}${ThemeEndpoints.UPDATE}`, {
					id_theme: selectedTheme.id_theme,
					subject_id: selectedTheme.subject_id,
					themeName: selectedTheme.themeName,
					mode: selectedTheme.mode,
					questionAmount: selectedTheme.questionAmount,
				})
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
}
