// import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
// import $api from '../../../query/axios/base.ts'
// import CardEndpoints from '../../../api/cards/endpoints.ts'
// import { IGetAllCardsResponse } from '../../../api/cards/reg/getAllCards.ts'
// import axios, { AxiosError, AxiosResponse } from 'axios'
// import styles from './cardPage.module.scss'
// import { useState } from 'react'
// import { IDeleteCardResponse } from '../../../api/cards/reg/deleteCard.ts'
// import queryClient from '../../../query/queryClient.ts'
// import {
// 	ICreateCardRequest,
// 	ICreateCardResponse,
// } from '../../../api/cards/reg/createCard.ts'
// import {
// 	IUpdateCardRequest,
// 	IUpdateCardResponse,
// } from '../../../api/cards/reg/updateCard.ts'
// import { IErrorResponse } from '../../../api/errorResponse.ts'
// //import useVirtualStore from '../../../store'

// export const CardsPage = () => {
// 	//const { id_user } = useVirtualStore()

// 	const [selectedCard, setSelectedCard] = useState<null | IUpdateCardRequest>(null)

// 	const newCardInitState: ICreateCardRequest = {
// 		theme_id: 0,
// 		word: '',
// 		correctAnswer: '',
// 		cardName: '',
// 		statistic_id: 0,
// 	}
// 	const [newCard, setNewCard] = useState<ICreateCardRequest>(newCardInitState)

// 	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<
// 		IGetAllCardsResponse,
// 		IErrorResponse
// 	>({
// 		queryKey: ['cards'],
// 		queryFn: async ({ pageParam }) => {
// 			try {
// 				const result = await $api.get<
// 					AxiosResponse<IErrorResponse>,
// 					AxiosResponse<IGetAllCardsResponse>
// 				>(`${CardEndpoints.BASE}${CardEndpoints.GET_ALL_CARDS}`, {
// 					params: {
// 						skip: 0,
// 						take: pageParam?.pageSize || 25,
// 						cursor: pageParam?.cursor,
// 					},
// 				})
// 				return {
// 					cardsData: result.data?.cardsData,
// 					cursor: result.data?.cursor,
// 				}
// 			} catch (e) {
// 				if (axios.isAxiosError(e)) throw e?.response?.data
// 				throw e
// 			}
// 		},
// 		refetchOnWindowFocus: false,
// 		initialPageParam: { pageSize: 25, cursor: null },
// 		getNextPageParam: lastPage => {
// 			if (lastPage.cardsData.length < 25) return
// 			return {
// 				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
// 				pageSize: 25,
// 			}
// 		},
// 		retry: false,
// 	})
// 	const [search, setSearch] = useState('')

// 	const { mutateAsync: dropCard } = useMutation({
// 		mutationFn: async (id_Card: number) => {
// 			try {
// 				const result = await $api.delete<IDeleteCardResponse>(
// 					`${CardEndpoints.BASE}${CardEndpoints.DELETE}`,
// 					{
// 						data: {
// 							CardsId: [id_Card],
// 						},
// 					}
// 				)
// 				return result.data.count
// 			} catch (e) {
// 				if (axios.isAxiosError(e)) throw e?.response?.data
// 				throw e
// 			}
// 		},
// 		onSuccess: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: ['cards'],
// 			})
// 		},
// 	})

// 	const { mutateAsync: createCard } = useMutation({
// 		mutationFn: async () => {
// 			try {
// 				const result = await $api.post<
// 					AxiosError<IErrorResponse>,
// 					AxiosResponse<ICreateCardResponse>,
// 					ICreateCardRequest
// 				>(`${CardEndpoints.BASE}${CardEndpoints.CREATE}`, {
// 					theme_id: newCard.theme_id,
// 					word: newCard.word,
// 					correctAnswer: newCard.correctAnswer,
// 					cardName: newCard.cardName,
// 					statistic_id: newCard.statistic_id,
// 				})
// 				return result.data
// 			} catch (e) {
// 				if (axios.isAxiosError(e)) throw e?.response?.data
// 				throw e
// 			}
// 		},
// 		onSuccess: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: ['cards'],
// 			})
// 		},
// 	})

// 	const { mutateAsync: updateCard } = useMutation({
// 		mutationFn: async () => {
// 			try {
// 				if (!selectedCard) return
// 				const result = await $api.patch<
// 					IErrorResponse,
// 					AxiosResponse<IUpdateCardResponse>,
// 					IUpdateCardRequest
// 				>(`${CardEndpoints.BASE}${CardEndpoints.UPDATE}`, {
// 					id_card: selectedCard.id_card,
// 					theme_id: selectedCard.theme_id,
// 					word: selectedCard.word,
// 					correctAnswer: selectedCard.correctAnswer,
// 					cardName: selectedCard.cardName,
// 					statistic_id: selectedCard.statistic_id,
// 				})
// 				return result.data
// 			} catch (e) {
// 				if (axios.isAxiosError(e)) throw e?.response?.data
// 				throw e
// 			}
// 		},
// 		onSuccess: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: ['cards'],
// 			})
// 		},
// 	})
// 	return (
// 		<>
// 			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
// 				<div>
// 					<p>Искать</p>
// 					<input
// 						type='text'
// 						value={search}
// 						onChange={e => setSearch(e.target.value)}
// 					/>
// 				</div>
// 			</div>
// 			<div className={styles.container}>
// 				<div className={styles.modal}>
// 					{selectedCard ? (
// 						<>
// 							<p>Редактирование Предмета</p>
// 							<div>
// 								<p>ID</p>
// 								<input
// 									type='number'
// 									//step={0.01}
// 									value={selectedCard.id_card}
// 									onChange={e =>
// 										setSelectedCard(prev => ({
// 											...prev,
// 											id_card: +e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<p>Название Предмета</p>
// 								<input
// 									type='text'
// 									value={selectedCard.cardName}
// 									onChange={e =>
// 										setSelectedCard(prev => ({
// 											...prev,
// 											cardName: e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<button
// 									onClick={async () => {
// 										await updateCard()
// 										setSelectedCard(null)
// 									}}>
// 									Сохранить
// 								</button>
// 								<button onClick={() => setSelectedCard(null)}>Отменить</button>
// 							</div>
// 						</>
// 					) : (
// 						<>
// 							<p>Создание Предмета</p>
// 							<div>
// 								<p>Название Предмета</p>
// 								<input
// 									type='text'
// 									value={newCard.cardName}
// 									onChange={e =>
// 										setNewCard(prev => ({
// 											...prev,
// 											title: e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<button onClick={async () => await createCard()}>
// 									Сохранить
// 								</button>
// 								<button onClick={() => setNewCard(newCardInitState)}>
// 									Отменить
// 								</button>
// 							</div>
// 						</>
// 					)}
// 				</div>
// 				<div className={styles.cardsContainer}>
// 					{data?.pages.map(page =>
// 						page.cardsData
// 							.filter(item =>
// 								item.cardName.toLowerCase().includes(search.toLowerCase())
// 							)
// 							.map(item => (
// 								<div className={styles.card} key={item.id_card}>
// 									<p>{item.cardName}</p>
// 									<div>
// 										<div className={styles.cardEditBar}>
// 											<button
// 												onClick={() =>
// 													setSelectedCard({
// 														id_card: item.id_card,
// 														cardName: item.cardName,
// 													})
// 												}>
// 												Edit
// 											</button>
// 											<button
// 												className={styles.redButton}
// 												onClick={async () => await dropCard(item.id_card)}>
// 												Удалить навсегда
// 											</button>
// 										</div>
// 									</div>
// 								</div>
// 							))
// 					)}
// 					{hasNextPage && <button onClick={() => fetchNextPage()}>Ещё</button>}
// 				</div>
// 			</div>
// 		</>
// 	)
// }
