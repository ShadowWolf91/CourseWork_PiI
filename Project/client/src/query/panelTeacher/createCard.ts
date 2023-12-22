import {
	ICreateCardRequest,
	ICreateCardResponse,
} from '../../api/cards/reg/createCard.ts'
import { IErrorResponse } from '../../api/errorResponse.ts'
import $api from '../axios/base.ts'
import axios, { AxiosResponse } from 'axios'
import CardEndpoints from '../../api/cards/endpoints.ts'
import queryClient from '../queryClient.ts'
import { useMutation } from '@tanstack/react-query'

export function useCreateCard() {
	return useMutation<ICreateCardResponse, IErrorResponse, ICreateCardRequest>({
		mutationFn: async newCard => {
			try {
				const result = await $api.post<
					ICreateCardResponse,
					AxiosResponse<ICreateCardResponse>,
					ICreateCardRequest
				>(`${CardEndpoints.BASE}${CardEndpoints.CREATE}`, {
					theme_id: newCard.theme_id,
					word: newCard.word,
					correctAnswer: newCard.correctAnswer,
					cardName: newCard.cardName,
					statistic_id: newCard.statistic_id,
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
