import styles from './statPage.module.scss'
import { useState, useEffect } from 'react'
import { IUpdateStatisticRequest } from '../../../api/statistics/reg/updateStatistics.ts'
import { useGetAllStats } from '../../../query/panelTeacher/allStat.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { toast, ToastContainer } from 'react-toastify'
import { useUpdateStat } from '../../../query/panelTeacher/updateStat.ts'

export const StatsPage = () => {
	const [selectedStat, setSelectedStat] = useState<IUpdateStatisticRequest>(
		{} as IUpdateStatisticRequest
	)

	const { data, fetchNextPage, hasNextPage } = useGetAllStats()
	const [search, setSearch] = useState('')

	const {
		mutateAsync: updateOpenQuestion,
		isError: isUpdateError,
		error: updateError,
	} = useUpdateStat()

	useEffect(() => {
		if (isUpdateError)
			toast(updateError?.field + ' ' + updateError.message, { type: 'error' })
	}, [isUpdateError, updateError?.field, updateError?.message])

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div className={styles.modal}>
					<div className={styles.modal}>
						<p>Редактирование статистики</p>
						<div className={styles.div}>
							<p>ID статистики</p>
							<input
								type='number'
								step={1}
								value={selectedStat.id_statistics}
								max={32767}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										id_statistics: +e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Правильно отвеченные тесты</p>
							<input
								type='number'
								step={1}
								value={selectedStat.rightAnsweredTests}
								max={32767}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										rightAnsweredTests: +e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Правильно отвеченные открытые вопросы</p>
							<input
								type='number'
								step={1}
								value={selectedStat.rightAnsweredOQs}
								max={32767}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										rightAnsweredOQs: +e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Правильно отвеченные карточки</p>
							<input
								type='number'
								step={1}
								value={selectedStat.rightAnsweredCards}
								max={32767}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										rightAnsweredCards: +e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Оценка тестов</p>
							<input
								type='number'
								step={1}
								value={selectedStat.markTests}
								max={32767}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										markTests: +e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Оценка карточек</p>
							<input
								type='number'
								step={1}
								value={selectedStat.markCards}
								max={32767}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										markCards: +e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Оценка открытых вопросов</p>
							<input
								type='number'
								step={1}
								value={selectedStat.markOpenQuestions}
								max={32767}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										markOpenQuestions: +e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Название</p>
							<input
								type='text'
								className={styles.input}
								value={selectedStat.title}
								maxLength={20}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										title: e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>ID пользователя</p>
							<input
								type='number'
								step={1}
								value={selectedStat.user_id}
								max={32767}
								onChange={e =>
									setSelectedStat(prev => ({
										...prev,
										user_id: +e.target.value,
									}))
								}
							/>
						</div>
						<div>
							<button
								disabled={selectedStat.title === ''}
								onClick={async () => {
									await updateOpenQuestion(selectedStat)
									setSelectedStat({} as IUpdateStatisticRequest)
								}}>
								Сохранить
							</button>
							<button
								onClick={() => setSelectedStat({} as IUpdateStatisticRequest)}>
								Отменить
							</button>
						</div>
					</div>
				</div>
				<div className={styles.OpenQuestionsContainer}>
					{data?.pages.map(page =>
						page.statisticsData
							.filter(item =>
								item.title.toLowerCase().includes(search.toLowerCase())
							)
							.map(item => (
								<div className={styles.OpenQuestion} key={item.id_statistics}>
									<p>{item.title}</p>
									<div>
										<div className={styles.OpenQuestionEditBar}>
											<button
												onClick={() =>
													setSelectedStat({
														id_statistics: item.id_statistics,
														title: item.title,
														user_id: item.user_id,
														rightAnsweredTests: item.rightAnsweredTests,
														rightAnsweredOQs: item.rightAnsweredOQs,
														rightAnsweredCards: item.rightAnsweredCards,
														markTests: item.markTests,
														markCards: item.markCards,
														markOpenQuestions: item.markOpenQuestions,
													})
												}>
												Редактировать
											</button>
										</div>
									</div>
								</div>
							))
					)}
					{hasNextPage && <button onClick={() => fetchNextPage()}>Ещё</button>}
				</div>
				<ToastContainer />
			</div>
		</>
	)
}
