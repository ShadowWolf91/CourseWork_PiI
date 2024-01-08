import {
	ICreateThemeRequest,
	ICreateThemeResponse,
} from '../../api/themes/reg/createTheme.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import ThemeEndpoints from '../../api/themes/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useCreateTheme() {
	return useMutation<
		ICreateThemeResponse,
		IErrorResponse,
		{ newTheme: ICreateThemeRequest }
	>({
		mutationFn: async ({ newTheme }) => {
			try {
				const result = await $api.post<
					ICreateThemeResponse,
					AxiosResponse<ICreateThemeResponse>,
					ICreateThemeRequest
				>(`${ThemeEndpoints.BASE}${ThemeEndpoints.CREATE}`, {
					subject_id: newTheme.subject_id,
					themeName: newTheme.themeName,
					mode: newTheme.mode,
					// questionAmount: newTheme.questionAmount,
					// time: newTheme.time,
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
