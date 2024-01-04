import {
	IUpdateCardRequest,
	IUpdateCardResponse,
} from '../../api/cards/reg/updateCard.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import CardEndpoints from '../../api/cards/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useUpdateCard() {
	return useMutation<IUpdateCardResponse, IErrorResponse, IUpdateCardRequest>({
		mutationFn: async selectedCard => {
			try {
				const result = await $api.patch<
					IUpdateCardResponse,
					AxiosResponse<IUpdateCardResponse>,
					IUpdateCardRequest
				>(`${CardEndpoints.BASE}${CardEndpoints.UPDATE}`, {
					cardId: selectedCard.cardId,
					word: selectedCard?.word,
					correctAnswer: selectedCard?.correctAnswer,
					cardName: selectedCard?.cardName,
					statistic_id: selectedCard?.statistic_id,
				})
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
}
