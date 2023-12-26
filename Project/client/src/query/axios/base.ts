import axios, { AxiosResponse } from 'axios'
import {
	IUpdateUserTokenRequest,
	IUpdateUserTokenResponse,
} from '../../api/users/reg/updateUserToken.ts'
import UserEndpoints from '../../api/users/endpoints.ts'
import { Roles } from '../../api/enums.ts'
import { redirect } from 'react-router-dom'
import { IErrorResponse } from '../../api/errorResponse.ts'

export const API_URL = 'http://localhost:3000'

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use(instance => {
	instance.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
	return instance
})

$api.interceptors.response.use(
	instance => {
		return instance
	},
	async error => {
		if (!error.response) {
			error.response = {
				data: {
					message: 'Сервер не отвечает',
					code: 503,
				} satisfies IErrorResponse,
			}
			console.log(error)
			await Promise.reject(error)
		}
		const originalRequest = error?.config
		if (error?.response.status == 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const { username, role, device_id, user_id } = {
					device_id: localStorage.getItem('device_id'),
					username: localStorage.getItem('username'),
					role: localStorage.getItem('role') as Roles,
					user_id: localStorage.getItem('user_id'),
				}

				if (user_id && device_id && username) {
					const response = await axios.patch<
						IUpdateUserTokenRequest,
						AxiosResponse<IUpdateUserTokenResponse>,
						IUpdateUserTokenRequest
					>(
						`${API_URL}${UserEndpoints.BASE}${UserEndpoints.UPDATE_USER_TOKEN}`,
						{
							user_id: +user_id,
							device_id,
							role,
							username,
						},
						{ withCredentials: true }
					)

					localStorage.setItem('accessToken', response.data.accessToken)
					return $api.request(originalRequest)
				}
			} catch (e) {
				console.log(e)
				redirect('/auth')
			}
		}
		throw error
	}
)
export default $api
