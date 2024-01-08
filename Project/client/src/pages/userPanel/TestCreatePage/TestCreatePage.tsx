import styles from './testCreatePage.module.scss'
import { useEffect, useState } from 'react'
import { ICreateTestRequest } from '../../../api/tests/reg/createTest.ts'
import { useGetAllTests } from '../../../query/panelTeacher/allTests.ts'
import { useDropTest } from '../../../query/panelTeacher/deleteTest.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { toast, ToastContainer } from 'react-toastify'
import { useCreateTest } from '../../../query/panelTeacher/createTest.ts'
import useGetThemes from '../../../query/panelTeacher/allThemesForTests.ts'

export const UserTestCreatePage = () => {
	const newTestInitState: ICreateTestRequest = {
		theme_id: 0,
		question: '',
		optionA: '',
		optionB: '',
		optionC: '',
		optionD: '',
		correctAnswer: '',
		testName: '',
		statistic_id: 0,
	}

	const [newTest, setNewTest] = useState<ICreateTestRequest>(newTestInitState)

	const { data, fetchNextPage, hasNextPage } = useGetAllTests()
	const { data: themes, isFetching: fetchingTheme } = useGetThemes()
	const [search, setSearch] = useState('')

	const { dropTest } = useDropTest()

	const {
		mutateAsync: createTest,
		isError: isCreateError,
		error: createError,
	} = useCreateTest()

	useEffect(() => {
		if (isCreateError)
			toast(createError?.field + ' ' + createError.message, { type: 'error' })
	}, [createError?.field, createError?.message, isCreateError])

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div>
					<div className={styles.modal}>
						<h3 className={styles.name}>Создание теста</h3>
						<div className={styles.div}>
							<p>Тема</p>
							<select
								name='themeselect'
								id='themeselectnew'
								value={newTest?.theme_id}
								className={styles.input}
								onChange={e => {
									setNewTest(prev => ({
										...prev,
										theme_id: +e.target.value,
									}))
								}}>
								{!fetchingTheme &&
									themes?.map(theme => (
										<option value={theme.id_theme}>{theme.themeName}</option>
									))}
							</select>
						</div>
						<div className={styles.div}>
							<p>Вопрос</p>
							<input
								type='text'
								className={styles.input}
								value={newTest.question}
								maxLength={200}
								onChange={e =>
									setNewTest(prev => ({
										...prev,
										question: e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Ответ A</p>
							<input
								type='text'
								className={styles.input}
								value={newTest.optionA}
								maxLength={50}
								onChange={e =>
									setNewTest(prev => ({
										...prev,
										optionA: e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Ответ B</p>
							<input
								type='text'
								className={styles.input}
								value={newTest.optionB}
								maxLength={50}
								onChange={e =>
									setNewTest(prev => ({
										...prev,
										optionB: e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Ответ C</p>
							<input
								type='text'
								className={styles.input}
								value={newTest.optionC}
								maxLength={50}
								onChange={e =>
									setNewTest(prev => ({
										...prev,
										optionC: e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Ответ D</p>
							<input
								type='text'
								className={styles.input}
								value={newTest.optionD}
								maxLength={50}
								onChange={e =>
									setNewTest(prev => ({
										...prev,
										optionD: e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Правильный ответ</p>
							<input
								type='text'
								className={styles.input}
								value={newTest.correctAnswer}
								maxLength={50}
								onChange={e =>
									setNewTest(prev => ({
										...prev,
										correctAnswer: e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.div}>
							<p>Название теста</p>
							<input
								type='text'
								value={newTest.testName}
								className={styles.input}
								maxLength={50}
								onChange={e =>
									setNewTest(prev => ({
										...prev,
										testName: e.target.value,
									}))
								}
							/>
						</div>
						<div className={styles.buttons}>
							<button
								disabled={newTest.testName === ''}
								onClick={async () => {
									await createTest({ newTest })
									setNewTest(newTestInitState)
								}}>
								Создать
							</button>
							<button onClick={() => setNewTest(newTestInitState)}>
								Отменить
							</button>
						</div>
					</div>
				</div>
				<div className={styles.cardsContainer}>
					{data?.pages.map(page =>
						page.testsData
							.filter(item =>
								item.testName.toLowerCase().includes(search.toLowerCase())
							)
							.map(item => (
								<div className={styles.card} key={item.id_test}>
									<p>{item.testName}</p>
									<div>
										<div>
											<p>Вопрос: {item.question}</p>
											<p>А: {item.optionA}</p>
											<p>B: {item.optionB}</p>
											<p>C: {item.optionC}</p>
											<p>D: {item.optionD}</p>
										</div>
										<div className={styles.TestEditBar}>
											<button
												className={styles.redButton}
												onClick={async () => await dropTest(item.id_test)}>
												Удалить
											</button>
										</div>
									</div>
									<hr className={styles.line}></hr>
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
