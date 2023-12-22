import $api from '../axios/base.ts'
import { IDeleteCardResponse } from '../../api/cards/reg/deleteCard.ts'
import CardEndpoints from '../../api/cards/endpoints.ts'
import axios from 'axios'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'
import { IErrorResponse } from '../../api/errorResponse.ts'

export function useDropCard() {
	const { mutateAsync: dropCard } = useMutation<
		IDeleteCardResponse,
		IErrorResponse,
		number
	>({
		mutationFn: async id_card => {
			try {
				const result = await $api.delete<IDeleteCardResponse>(
					`${CardEndpoints.BASE}${CardEndpoints.DELETE}`,
					{
						data: {
							CardsId: [id_card],
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
				queryKey: ['cards'],
			})
		},
	})
	return {
		dropCard,
	}
}
