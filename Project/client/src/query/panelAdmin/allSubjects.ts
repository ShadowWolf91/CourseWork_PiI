import { IGetAllSubjectsResponse } from '../../api/subjects/reg/getAllSubjects.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import SubjectEndpoints from '../../api/subjects/endpoints.ts'
import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query'

export function useGetAllSubjects(subjectName?: string) {
	return useInfiniteQuery<
		IGetAllSubjectsResponse,
		IErrorResponse,
		InfiniteData<IGetAllSubjectsResponse>,
		(string | undefined)[],
		{ pageSize: number | undefined; cursor: number | null }
	>({
		queryKey: ['subjects'],
		queryFn: async ({ pageParam }) => {
			try {
				const result = await $api.get<
					IGetAllSubjectsResponse,
					AxiosResponse<IGetAllSubjectsResponse>
				>(`${SubjectEndpoints.BASE}${SubjectEndpoints.GET_ALL_SUBJECTS}`, {
					params: {
						skip: 0,
						take: pageParam?.pageSize || 25,
						cursor: pageParam?.cursor,
						subjectName,
					},
				})
				return {
					subjectsData: result.data?.subjectsData,
					cursor: result.data?.cursor,
				}
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		refetchOnWindowFocus: false,
		initialPageParam: { pageSize: 25, cursor: null },
		getNextPageParam: lastPage => {
			if (lastPage.subjectsData.length < 25) return
			return {
				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
				pageSize: 25,
			}
		},
		retry: false,
	})
}
