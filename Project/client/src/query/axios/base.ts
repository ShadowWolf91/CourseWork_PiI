import axios, { AxiosResponse } from 'axios'
import {
	IUpdateUserDataRequest,
	IUpdateUserDataResponse,
} from '../../api/users/reg/updateUserData.ts'
import UserEndpoints from '../../api/users/endpoints.ts'
import { Roles } from '../../api/enums.ts'

export const API_URL = 'http://localhost:3000'

const $api = axios.create({
	withCredentials: true,
	baseURL: API_URL,
})

$api.interceptors.request.use(instance => {
	instance.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
	return instance
})

$api.interceptors.response.use(
	instance => {
		return instance
	},
	async error => {
		const originalRequest = error?.config
		if (error?.response.status == 401 && error.config && !error.config._isRetry) {
			originalRequest._isRetry = true
			try {
				const { username, role, id_user } = {
					username: localStorage.getItem('username'),
					role: localStorage.getItem('role') as Roles,
					id_user: localStorage.getItem('id_user'),
				}

				if (id_user && username) {
					const response = await axios.patch<
						IUpdateUserDataRequest,
						AxiosResponse<IUpdateUserDataResponse>,
						IUpdateUserDataRequest
					>(
						`${API_URL}${UserEndpoints.BASE}${UserEndpoints.UPDATE_USER_DATA}`,
						{
							id_user: +id_user,
							role,
							username,
						},
						{ withCredentials: true }
					)

					localStorage.setItem('token', response.data.token)
					return $api.request(originalRequest)
				}
			} catch (e) {
				console.log(e)
			}
		}
		throw error
	}
)
export default $api
