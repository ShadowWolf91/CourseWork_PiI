import $api from '../axios/base.ts'
import { IDeleteTestResponse } from '../../api/tests/reg/deleteTest.ts'
import TestEndpoints from '../../api/tests/endpoints.ts'
import axios from 'axios'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'
import { IErrorResponse } from '../../api/errorResponse.ts'

export function useDropTest() {
	const { mutateAsync: dropTest } = useMutation<
		IDeleteTestResponse,
		IErrorResponse,
		number
	>({
		mutationFn: async id_test => {
			try {
				const result = await $api.delete<IDeleteTestResponse>(
					`${TestEndpoints.BASE}${TestEndpoints.DELETE}`,
					{
						data: {
							TestsId: [id_test],
						},
					}
				)
				return result.data
			} catch (e) {
				if (axios.isAxiosError(e)) throw e?.response?.data
				throw e
			}
		},
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ['tests'],
			})
		},
	})
	return {
		dropTest,
	}
}
