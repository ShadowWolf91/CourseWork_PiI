import $api from '../axios/base.ts'
import UserEndpoints from '../../api/users/endpoints.ts'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse, isAxiosError } from 'axios'
import { IErrorResponse } from '../../api/errorResponse.ts'
import { ILoginUserRequest, ILoginUserResponse } from '../../api/users/reg/loginUser.ts'
import { v4 } from 'uuid'

export const useAuth = () => {
	const { data, mutateAsync, error, isSuccess, isError } = useMutation<
		ILoginUserResponse,
		IErrorResponse,
		{ username: string; password: string }
	>({
		mutationKey: ['username'],
		mutationFn: async ({ username, password }) => {
			try {
				const result = await $api.post<
					AxiosResponse<IErrorResponse>,
					AxiosResponse<ILoginUserResponse>,
					ILoginUserRequest
				>(`${UserEndpoints.BASE}${UserEndpoints.USERNAME}`, {
					username,
					password,
					device_id: v4(),
				})
				return result.data
			} catch (e) {
				if (isAxiosError(e)) throw e.response?.data
				throw e
			}
		},
		retry: false,
	})

	return {
		data,
		loginUser: mutateAsync,
		error,
		isLoginSuccess: isSuccess,
		isLoginError: isError,
	}
}
