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

export function useCreateSubject() {
	return useMutation<ICreateSessionResponse, IErrorResponse, ICreateSessionRequest>({
		mutationFn: async newSession => {
			try {
				const result = await $api.post<
					ICreateSessionResponse,
					AxiosResponse<ICreateSessionResponse>,
					ICreateSessionRequest
				>(`${SessionEndpoints.BASE}${SessionEndpoints.CREATE}`, {
					id: newSession.id,
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
