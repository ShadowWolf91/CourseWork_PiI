import {
	ICreateSessionRequest,
	ICreateSessionResponse,
} from '../../api/session/reg/createSession.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import SessionEndpoints from '../../api/session/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'
import useVirtualStore from '../../store/index.ts'

export function useCreateSession() {
	const { id_user } = useVirtualStore()
	return useMutation<ICreateSessionResponse, IErrorResponse, { themeId: number }>({
		mutationFn: async newSession => {
			try {
				const result = await $api.post<
					ICreateSessionResponse,
					AxiosResponse<ICreateSessionResponse>,
					ICreateSessionRequest
				>(`${SessionEndpoints.BASE}${SessionEndpoints.CREATE}`, {
					themeId: newSession.themeId,
					userId: +id_user!,
				})
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['session'],
			})
		},
	})
}
