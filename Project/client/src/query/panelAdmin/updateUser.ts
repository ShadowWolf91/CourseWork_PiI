import { useMutation } from '@tanstack/react-query'
import $api from '../axios/base.ts'
import {
	IUpdateUserDataRequest,
	IUpdateUserDataResponse,
} from '../../api/users/reg/updateUserData.ts'
import axios, { AxiosResponse } from 'axios'
import UserEndpoints from '../../api/users/endpoints.ts'
import queryClient from '../queryClient.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'

export type SelectedUser = {
	id_user?: number
	username?: string
	password?: string
} | null

export function useUpdateUser() {
	return useMutation<IUpdateUserDataResponse | void, IErrorResponse, SelectedUser>({
		mutationFn: async (selectedUser: SelectedUser) => {
			try {
				if (!selectedUser || !selectedUser.id_user) return
				const result = await $api.patch<
					IUpdateUserDataResponse,
					AxiosResponse<IUpdateUserDataResponse>,
					IUpdateUserDataRequest
				>(`${UserEndpoints.BASE}${UserEndpoints.UPDATE_USER_DATA}`, {
					id_user: selectedUser.id_user,
					username: selectedUser.username || undefined,
					password: selectedUser.password || undefined,
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
