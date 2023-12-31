import $api from '../axios/base.ts'
import { useQuery } from '@tanstack/react-query'
import axios, { AxiosResponse } from 'axios'
import { IGetSubjectsResponse } from '../../api/subjects/reg/getAllSubjects.ts'
import SubjectsEndpoints from '../../api/subjects/endpoints.ts'

export const useGetSubjects = () => {
	const { data, isFetching } = useQuery({
		queryKey: ['getSubjects'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetSubjectsResponse[],
					AxiosResponse<IGetSubjectsResponse[]>
				>(`${SubjectsEndpoints.BASE}${SubjectsEndpoints.GET_SUBJECTS}`, {
					withCredentials: false,
				})
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		retry: false,
	})

	return {
		data,
		isFetching,
	}
}

export default useGetSubjects
