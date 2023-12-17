import $api from '../axios/base.ts'
import UserEndpoints from '../../api/users/endpoints.ts'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { IErrorResponse } from '../../api/errorResponse.ts'
import { ILoginUserRequest, ILoginUserResponse } from '../../api/users/reg/loginUser.ts'

export const useAuth = () => {
	const { data, mutateAsync, error, isSuccess, isError } = useMutation({
		mutationKey: ['username'],
		mutationFn: async ({
			username,
			password,
		}: {
			username: string
			password: string
		}) => {
			const result = await $api.post<
				AxiosResponse<IErrorResponse>,
				AxiosResponse<ILoginUserResponse>,
				ILoginUserRequest
			>(`${UserEndpoints.BASE}${UserEndpoints.USERNAME}`, {
				username,
				password,
			})
			return result.data
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
