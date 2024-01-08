import $api from '../axios/base.ts'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import {
	IGetStatisticByUserIdRequest,
	IGetStatisticByUserIdResponse,
} from '../../api/statistics/reg/getStatisticByUserId.ts'
import StatEndpoints from '../../api/statistics/endpoints.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import { useParams } from 'react-router-dom'

export const useGetStat = () => {
	const { id_user } = useParams()
	const { data, error, isLoading } = useQuery<
		IGetStatisticByUserIdRequest,
		IErrorResponse,
		IGetStatisticByUserIdResponse,
		['userStat']
	>({
		queryKey: ['userStat'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetStatisticByUserIdResponse,
					AxiosResponse<IGetStatisticByUserIdResponse>
				>(`${StatEndpoints.BASE}${StatEndpoints.GET_BY_USER_ID}`, {
					params: {
						id_user,
					},
				})

				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) return e?.response?.data
				return e
			}
		},
		retry: false,
	})

	return {
		data,
		error,
		isLoading,
	}
}

export default useGetStat
