import { useMutation } from '@tanstack/react-query'
import $api from '../axios/base.ts'
import {
	IDeleteUsersRequest,
	IDeleteUsersResponse,
} from '../../api/users/reg/deleteUsers.ts'
import axios, { AxiosResponse } from 'axios'
import UserEndpoints from '../../api/users/endpoints.ts'
import queryClient from '../queryClient.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'

export function useDropUser() {
	return useMutation<IDeleteUsersResponse, IErrorResponse, number>({
		mutationFn: async id_user => {
			try {
				const result = await $api.delete<
					IDeleteUsersResponse,
					AxiosResponse<IDeleteUsersResponse>,
					IDeleteUsersRequest
				>(`${UserEndpoints.BASE}${UserEndpoints.DELETE_USERS}`, {
					data: {
						userIds: [id_user],
					},
				})
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['users'],
			})
		},
	})
}
