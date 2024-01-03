import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import UserEndpoints from '../../api/users/endpoints.ts'
import {
	IDeleteUserTokensRequest,
	IDeleteUserTokensResponse,
} from '../../api/users/reg/deleteUserTokens.ts'
import $api from '../axios/base.ts'

export const useLogout = () => {
	const { mutateAsync, isError, error, isSuccess } = useMutation({
		mutationKey: ['username'],
		mutationFn: async ({
			user_id,
			device_id,
		}: {
			user_id: number
			device_id: string[]
		}) => {
			try {
				const result = await $api.delete<
					IDeleteUserTokensResponse,
					AxiosResponse<IDeleteUserTokensResponse>,
					IDeleteUserTokensRequest
				>(`${UserEndpoints.BASE}${UserEndpoints.DELETE_USER_TOKENS}`, {
					data: {
						user_id,
						device_id,
					},
				})
				return result.data
			} catch (e) {
				if (e instanceof AxiosError) return e.response?.data
				return e
			}
		},
	})

	return {
		logout: mutateAsync,
		isLogoutError: isError,
		logoutError: error,
		isLogoutSuccess: isSuccess,
	}
}
