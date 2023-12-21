// import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
// import $api from '../../../query/axios/base.ts'
// import OpenQuestionEndpoints from '../../../api/openQuestions/endpoints.ts'
// import { IGetAllOpenQuestionsResponse } from '../../../api/openQuestions/reg/getAllOpenQuestions.ts'
// import axios, { AxiosError, AxiosResponse } from 'axios'
// import styles from './openQuestionPage.module.scss'
// import { useState } from 'react'
// import { IDeleteOpenQuestionResponse } from '../../../api/openQuestions/reg/deleteOpenQuestion.ts'
// import queryClient from '../../../query/queryClient.ts'
// import {
// 	ICreateOpenQuestionRequest,
// 	ICreateOpenQuestionResponse,
// } from '../../../api/openQuestions/reg/createOpenQuestion.ts'
// import {
// 	IUpdateOpenQuestionRequest,
// 	IUpdateOpenQuestionResponse,
// } from '../../../api/openQuestions/reg/updateOpenQuestion.ts'
// import { IErrorResponse } from '../../../api/errorResponse.ts'
// //import useVirtualStore from '../../../store'

// export const OpenQuestionsPage = () => {
// 	//const { id_user } = useVirtualStore()

// 	const [selectedOpenQuestion, setSelectedOpenQuestion] =
// 		useState<null | IUpdateOpenQuestionRequest>(null)

// 	const newOpenQuestionInitState: ICreateOpenQuestionRequest = {
// 		theme_id: 0,
// 		question: '',
// 		correctAnswer: '',
// 		openQuestionName: '',
// 		statistic_id: 0,
// 	}
// 	const [newOpenQuestion, setNewOpenQuestion] = useState<ICreateOpenQuestionRequest>(
// 		newOpenQuestionInitState
// 	)

// 	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<
// 		IGetAllOpenQuestionsResponse,
// 		IErrorResponse
// 	>({
// 		queryKey: ['openQuestions'],
// 		queryFn: async ({ pageParam }) => {
// 			try {
// 				const result = await $api.get<
// 					AxiosResponse<IErrorResponse>,
// 					AxiosResponse<IGetAllOpenQuestionsResponse>
// 				>(
// 					`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.GET_ALL_OPEN_QUESTIONS}`,
// 					{
// 						params: {
// 							skip: 0,
// 							take: pageParam?.pageSize || 25,
// 							cursor: pageParam?.cursor,
// 						},
// 					}
// 				)
// 				return {
// 					openQuestionsData: result.data?.openQuestionsData,
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
// 			if (lastPage.openQuestionsData.length < 25) return
// 			return {
// 				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
// 				pageSize: 25,
// 			}
// 		},
// 		retry: false,
// 	})
// 	const [search, setSearch] = useState('')

// 	const { mutateAsync: dropOpenQuestion } = useMutation({
// 		mutationFn: async (id_OpenQuestion: number) => {
// 			try {
// 				const result = await $api.delete<IDeleteOpenQuestionResponse>(
// 					`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.DELETE}`,
// 					{
// 						data: {
// 							OpenQuestionsId: [id_OpenQuestion],
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
// 				queryKey: ['openQuestions'],
// 			})
// 		},
// 	})

// 	const { mutateAsync: createOpenQuestion } = useMutation({
// 		mutationFn: async () => {
// 			try {
// 				const result = await $api.post<
// 					AxiosError<IErrorResponse>,
// 					AxiosResponse<ICreateOpenQuestionResponse>,
// 					ICreateOpenQuestionRequest
// 				>(`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.CREATE}`, {
// 					theme_id: newOpenQuestion.theme_id,
// 					question: newOpenQuestion.question,
// 					correctAnswer: newOpenQuestion.correctAnswer,
// 					openQuestionName: newOpenQuestion.openQuestionName,
// 					statistic_id: newOpenQuestion.statistic_id,
// 				})
// 				return result.data
// 			} catch (e) {
// 				if (axios.isAxiosError(e)) throw e?.response?.data
// 				throw e
// 			}
// 		},
// 		onSuccess: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: ['openQuestions'],
// 			})
// 		},
// 	})

// 	const { mutateAsync: updateOpenQuestion } = useMutation({
// 		mutationFn: async () => {
// 			try {
// 				if (!selectedOpenQuestion) return
// 				const result = await $api.patch<
// 					IErrorResponse,
// 					AxiosResponse<IUpdateOpenQuestionResponse>,
// 					IUpdateOpenQuestionRequest
// 				>(`${OpenQuestionEndpoints.BASE}${OpenQuestionEndpoints.UPDATE}`, {
// 					id_openQuestion: selectedOpenQuestion.id_openQuestion,
// 					theme_id: selectedOpenQuestion.theme_id,
// 					question: selectedOpenQuestion.question,
// 					correctAnswer: selectedOpenQuestion.correctAnswer,
// 					openQuestionName: selectedOpenQuestion.openQuestionName,
// 					statistic_id: selectedOpenQuestion.statistic_id,
// 				})
// 				return result.data
// 			} catch (e) {
// 				if (axios.isAxiosError(e)) throw e?.response?.data
// 				throw e
// 			}
// 		},
// 		onSuccess: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: ['openQuestions'],
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
// 					{selectedOpenQuestion ? (
// 						<>
// 							<p>Редактирование Предмета</p>
// 							<div>
// 								<p>ID</p>
// 								<input
// 									type='number'
// 									//step={0.01}
// 									value={selectedOpenQuestion.id_openQuestion}
// 									onChange={e =>
// 										setSelectedOpenQuestion(prev => ({
// 											...prev,
// 											id_openQuestion: +e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<p>Название Предмета</p>
// 								<input
// 									type='text'
// 									value={selectedOpenQuestion.openQuestionName}
// 									onChange={e =>
// 										setSelectedOpenQuestion(prev => ({
// 											...prev,
// 											openQuestionName: e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<button
// 									onClick={async () => {
// 										await updateOpenQuestion()
// 										setSelectedOpenQuestion(null)
// 									}}>
// 									Сохранить
// 								</button>
// 								<button onClick={() => setSelectedOpenQuestion(null)}>
// 									Отменить
// 								</button>
// 							</div>
// 						</>
// 					) : (
// 						<>
// 							<p>Создание Предмета</p>
// 							<div>
// 								<p>Название Предмета</p>
// 								<input
// 									type='text'
// 									value={newOpenQuestion.openQuestionName}
// 									onChange={e =>
// 										setNewOpenQuestion(prev => ({
// 											...prev,
// 											title: e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<button onClick={async () => await createOpenQuestion()}>
// 									Сохранить
// 								</button>
// 								<button
// 									onClick={() => setNewOpenQuestion(newOpenQuestionInitState)}>
// 									Отменить
// 								</button>
// 							</div>
// 						</>
// 					)}
// 				</div>
// 				<div className={styles.cardsContainer}>
// 					{data?.pages.map(page =>
// 						page.openQuestionsData
// 							.filter(item =>
// 								item.openQuestionName.toLowerCase().includes(search.toLowerCase())
// 							)
// 							.map(item => (
// 								<div className={styles.card} key={item.id_openQuestion}>
// 									<p>{item.openQuestionName}</p>
// 									<div>
// 										<div className={styles.cardEditBar}>
// 											<button
// 												onClick={() =>
// 													setSelectedOpenQuestion({
// 														id_openQuestion: item.id_openQuestion,
// 														openQuestionName: item.openQuestionName,
// 													})
// 												}>
// 												Edit
// 											</button>
// 											<button
// 												className={styles.redButton}
// 												onClick={async () =>
// 													await dropOpenQuestion(item.id_openQuestion)
// 												}>
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
