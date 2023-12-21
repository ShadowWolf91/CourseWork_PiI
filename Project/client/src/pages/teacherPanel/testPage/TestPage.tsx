// import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
// import $api from '../../../query/axios/base.ts'
// import TestEndpoints from '../../../api/tests/endpoints.ts'
// import { IGetAllTestsResponse } from '../../../api/tests/reg/getAllTests.ts'
// import axios, { AxiosError, AxiosResponse } from 'axios'
// import styles from './testPage.module.scss'
// import { useState } from 'react'
// import { IDeleteTestResponse } from '../../../api/tests/reg/deleteTest.ts'
// import queryClient from '../../../query/queryClient.ts'
// import {
// 	ICreateTestRequest,
// 	ICreateTestResponse,
// } from '../../../api/tests/reg/createTest.ts'
// import {
// 	IUpdateTestRequest,
// 	IUpdateTestResponse,
// } from '../../../api/tests/reg/updateTest.ts'
// import { IErrorResponse } from '../../../api/errorResponse.ts'
// //import useVirtualStore from '../../../store'

// export const TestsPage = () => {
// 	//const { id_user } = useVirtualStore()

// 	const [selectedTest, setSelectedTest] = useState<null | IUpdateTestRequest>(null)

// 	const newTestInitState: ICreateTestRequest = {
// 		theme_id: 0,
// 		question: '',
// 		optionA: '',
// 		optionB: '',
// 		optionC: '',
// 		optionD: '',
// 		correctAnswer: '',
// 		testName: '',
// 		statistic_id: 0,
// 	}
// 	const [newTest, setNewTest] = useState<ICreateTestRequest>(newTestInitState)

// 	const { data, hasNextPage, fetchNextPage } = useInfiniteQuery<
// 		IGetAllTestsResponse,
// 		IErrorResponse
// 	>({
// 		queryKey: ['tests'],
// 		queryFn: async ({ pageParam }) => {
// 			try {
// 				const result = await $api.get<
// 					AxiosResponse<IErrorResponse>,
// 					AxiosResponse<IGetAllTestsResponse>
// 				>(`${TestEndpoints.BASE}${TestEndpoints.GET_ALL_TESTS}`, {
// 					params: {
// 						skip: 0,
// 						take: pageParam?.pageSize || 25,
// 						cursor: pageParam?.cursor,
// 					},
// 				})
// 				return {
// 					testsData: result.data?.testsData,
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
// 			if (lastPage.testsData.length < 25) return
// 			return {
// 				cursor: lastPage?.cursor ? lastPage.cursor + 1 : null,
// 				pageSize: 25,
// 			}
// 		},
// 		retry: false,
// 	})
// 	const [search, setSearch] = useState('')

// 	const { mutateAsync: dropTest } = useMutation({
// 		mutationFn: async (id_test: number) => {
// 			try {
// 				const result = await $api.delete<IDeleteTestResponse>(
// 					`${TestEndpoints.BASE}${TestEndpoints.DELETE}`,
// 					{
// 						data: {
// 							testsId: [id_test],
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
// 				queryKey: ['tests'],
// 			})
// 		},
// 	})

// 	const { mutateAsync: createTest } = useMutation({
// 		mutationFn: async () => {
// 			try {
// 				const result = await $api.post<
// 					AxiosError<IErrorResponse>,
// 					AxiosResponse<ICreateTestResponse>,
// 					ICreateTestRequest
// 				>(`${TestEndpoints.BASE}${TestEndpoints.CREATE}`, {
// 					theme_id: newTest.theme_id,
// 					question: newTest.question,
// 					optionA: newTest.optionA,
// 					optionB: newTest.optionB,
// 					optionC: newTest.optionC,
// 					optionD: newTest.optionD,
// 					correctAnswer: newTest.correctAnswer,
// 					testName: newTest.testName,
// 					statistic_id: newTest.statistic_id,
// 				})
// 				return result.data
// 			} catch (e) {
// 				if (axios.isAxiosError(e)) throw e?.response?.data
// 				throw e
// 			}
// 		},
// 		onSuccess: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: ['tests'],
// 			})
// 		},
// 	})

// 	const { mutateAsync: updateTest } = useMutation({
// 		mutationFn: async () => {
// 			try {
// 				if (!selectedTest) return
// 				const result = await $api.patch<
// 					IErrorResponse,
// 					AxiosResponse<IUpdateTestResponse>,
// 					IUpdateTestRequest
// 				>(`${TestEndpoints.BASE}${TestEndpoints.UPDATE}`, {
// 					id_test: selectedTest.id_test,
// 					question: selectedTest.question,
// 					testName: selectedTest.testName,
// 					optionA: selectedTest.optionA,
// 					optionB: selectedTest.optionB,
// 					optionC: selectedTest.optionC,
// 					optionD: selectedTest.optionD,
// 					correctAnswer: selectedTest.correctAnswer,
// 					statistic_id: selectedTest.statistic_id,
// 				})
// 				return result.data
// 			} catch (e) {
// 				if (axios.isAxiosError(e)) throw e?.response?.data
// 				throw e
// 			}
// 		},
// 		onSuccess: async () => {
// 			await queryClient.invalidateQueries({
// 				queryKey: ['tests'],
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
// 					{selectedTest ? (
// 						<>
// 							<p>Редактирование Предмета</p>
// 							<div>
// 								<p>ID</p>
// 								<input
// 									type='number'
// 									//step={0.01}
// 									value={selectedTest.id_test}
// 									onChange={e =>
// 										setSelectedTest(prev => ({
// 											...prev,
// 											id_Test: +e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<p>Название Предмета</p>
// 								<input
// 									type='text'
// 									value={selectedTest.testName}
// 									onChange={e =>
// 										setSelectedTest(prev => ({
// 											...prev,
// 											TestName: e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<button
// 									onClick={async () => {
// 										await updateTest()
// 										setSelectedTest(null)
// 									}}>
// 									Сохранить
// 								</button>
// 								<button onClick={() => setSelectedTest(null)}>Отменить</button>
// 							</div>
// 						</>
// 					) : (
// 						<>
// 							<p>Создание Предмета</p>
// 							<div>
// 								<p>Название Предмета</p>
// 								<input
// 									type='text'
// 									value={newTest.testName}
// 									onChange={e =>
// 										setNewTest(prev => ({
// 											...prev,
// 											title: e.target.value,
// 										}))
// 									}
// 								/>
// 							</div>
// 							<div>
// 								<button onClick={async () => await createTest()}>
// 									Сохранить
// 								</button>
// 								<button onClick={() => setNewTest(newTestInitState)}>
// 									Отменить
// 								</button>
// 							</div>
// 						</>
// 					)}
// 				</div>
// 				<div className={styles.cardsContainer}>
// 					{data?.pages.map(page =>
// 						page.testsData
// 							.filter(item =>
// 								item.testName.toLowerCase().includes(search.toLowerCase())
// 							)
// 							.map(item => (
// 								<div className={styles.card} key={item.id_test}>
// 									<p>{item.testName}</p>
// 									<div>
// 										<div className={styles.cardEditBar}>
// 											<button
// 												onClick={() =>
// 													setSelectedTest({
// 														id_test: item.id_test,
// 														testName: item.testName,
// 													})
// 												}>
// 												Edit
// 											</button>
// 											<button
// 												className={styles.redButton}
// 												onClick={async () => await dropTest(item.id_test)}>
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
