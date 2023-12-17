import $api from '../axios/base.ts'
import UserEndpoints from '../../api/users/endpoints.ts'
import { useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { IErrorResponse } from '../../api/errorResponse.ts'
import {
	ICreateUserRequest,
	ICreateUserResponse,
} from '../../api/users/reg/createUser.ts'
import {
	ICreateUserTokenRequest,
	ICreateUserTokenResponse,
} from '../../api/users/reg/createUserToken.ts'
import { Roles } from '../../api/enums.ts'

export const useRegistration = () => {
	const { data, mutateAsync, error, isSuccess, isError } = useMutation({
		mutationKey: ['username'],
		mutationFn: async ({
			password,
			username,
		}: {
			password: string
			username: string
		}) => {
			const user = await $api.post<
				AxiosResponse<IErrorResponse>,
				AxiosResponse<ICreateUserResponse>,
				ICreateUserRequest
			>(
				`${UserEndpoints.BASE}${UserEndpoints.CREATE_USER}`,
				{ password, username, role: 'DEFAULT' },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			)
			if (!user) throw Error('Cannot create user')
			const userData = user.data
			const result = await $api.post<
				AxiosResponse<IErrorResponse>,
				AxiosResponse<ICreateUserTokenResponse>,
				ICreateUserTokenRequest
			>(`${UserEndpoints.BASE}${UserEndpoints.CREATE_USER_TOKEN}`, {
				id_user: userData.id_user,
				role: Roles.DEFAULT,
				username,
				password,
			})
			return { ...userData, ...result.data }
		},
		retry: false,
	})

	return {
		data,
		registerUser: mutateAsync,
		error,
		isSuccessRegistration: isSuccess,
		isRegistrationError: isError,
	}
}
