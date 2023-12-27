import styles from './testPage.module.scss'
import { useEffect, useState } from 'react'
import { ICreateTestRequest } from '../../../api/tests/reg/createTest.ts'
import { IUpdateTestRequest } from '../../../api/tests/reg/updateTest.ts'
import { useGetAllTests } from '../../../query/panelTeacher/allTests.ts'
import { useDropTest } from '../../../query/panelTeacher/deleteTest.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { toast, ToastContainer } from 'react-toastify'
import { useCreateTest } from '../../../query/panelTeacher/createTest.ts'
import { useUpdateTest } from '../../../query/panelTeacher/updateTest.ts'

export const TestsPage = () => {
	const [selectedTest, setSelectedTest] = useState<IUpdateTestRequest>(
		{} as IUpdateTestRequest
	)

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
	const [search, setSearch] = useState('')

	const { dropTest } = useDropTest()

	const {
		mutateAsync: createTest,
		isError: isCreateError,
		error: createError,
	} = useCreateTest()

	const {
		mutateAsync: updateTest,
		isError: isUpdateError,
		error: updateError,
	} = useUpdateTest()

	useEffect(() => {
		if (isCreateError)
			toast(createError?.field + ' ' + createError.message, { type: 'error' })
		if (isUpdateError)
			toast(updateError?.field + ' ' + updateError.message, { type: 'error' })
	}, [
		createError?.field,
		createError?.message,
		isCreateError,
		isUpdateError,
		updateError?.field,
		updateError?.message,
	])

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div className={styles.modal}>
					{Object.keys(selectedTest).length ? (
						<div className={styles.modal}>
							<p>Редактирование теста</p>
							<div className={styles.div}>
								<p>ID теста</p>
								<input
									type='number'
									step={1}
									value={selectedTest.id_test}
									max={32767}
									onChange={e =>
										setSelectedTest(prev => ({
											...prev,
											id_test: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>ID темы</p>
								<input
									type='number'
									step={1}
									value={selectedTest.theme_id}
									max={32767}
									onChange={e =>
										setSelectedTest(prev => ({
											...prev,
											theme_id: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Вопрос</p>
								<input
									type='text'
									className={styles.input}
									value={selectedTest.question}
									maxLength={20}
									onChange={e =>
										setSelectedTest(prev => ({
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
									value={selectedTest.optionA}
									maxLength={20}
									onChange={e =>
										setSelectedTest(prev => ({
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
									value={selectedTest.optionB}
									maxLength={20}
									onChange={e =>
										setSelectedTest(prev => ({
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
									value={selectedTest.optionC}
									maxLength={20}
									onChange={e =>
										setSelectedTest(prev => ({
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
									value={selectedTest.optionD}
									maxLength={20}
									onChange={e =>
										setSelectedTest(prev => ({
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
									value={selectedTest.correctAnswer}
									maxLength={20}
									onChange={e =>
										setSelectedTest(prev => ({
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
									className={styles.input}
									value={selectedTest.testName}
									maxLength={20}
									onChange={e =>
										setSelectedTest(prev => ({
											...prev,
											testName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>ID статистики</p>
								<input
									type='number'
									step={1}
									value={selectedTest.statistic_id}
									max={32767}
									onChange={e =>
										setSelectedTest(prev => ({
											...prev,
											statistic_id: +e.target.value,
										}))
									}
								/>
							</div>
							<div>
								<button
									disabled={selectedTest.testName === ''}
									onClick={async () => {
										await updateTest(selectedTest)
										setSelectedTest({} as IUpdateTestRequest)
									}}>
									Сохранить
								</button>
								<button onClick={() => setSelectedTest({} as IUpdateTestRequest)}>
									Отменить
								</button>
							</div>
						</div>
					) : (
						<div className={styles.modal}>
							<p>Создание теста</p>
							<div className={styles.div}>
								<p>ID темы</p>
								<input
									type='number'
									step={1}
									value={newTest.theme_id}
									max={32767}
									onChange={e =>
										setNewTest(prev => ({
											...prev,
											theme_id: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Вопрос</p>
								<input
									type='text'
									className={styles.input}
									value={newTest.question}
									maxLength={20}
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
									maxLength={20}
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
									maxLength={20}
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
									maxLength={20}
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
									maxLength={20}
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
									maxLength={20}
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
									maxLength={20}
									onChange={e =>
										setNewTest(prev => ({
											...prev,
											testName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>ID статистики</p>
								<input
									type='number'
									step={1}
									value={newTest.statistic_id}
									max={32767}
									onChange={e =>
										setNewTest(prev => ({
											...prev,
											statistic_id: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.buttons}>
								<button
									disabled={newTest.testName === ''}
									onClick={async () => {
										await createTest(newTest)
										setNewTest(newTestInitState)
									}}>
									Сохранить
								</button>
								<button onClick={() => setNewTest(newTestInitState)}>
									Отменить
								</button>
							</div>
						</div>
					)}
				</div>
				<div className={styles.TestsContainer}>
					{data?.pages.map(page =>
						page.testsData
							.filter(item =>
								item.testName.toLowerCase().includes(search.toLowerCase())
							)
							.map(item => (
								<div className={styles.Test} key={item.id_test}>
									<p>{item.testName}</p>
									<div>
										<div className={styles.TestEditBar}>
											<button
												onClick={() =>
													setSelectedTest({
														id_test: item.id_test,
														testName: item.testName,
														question: item.question,
														optionA: item.optionA,
														optionB: item.optionB,
														optionC: item.optionC,
														optionD: item.optionD,
														correctAnswer: item.correctAnswer,
													})
												}>
												Редактировать
											</button>
											<button
												className={styles.redButton}
												onClick={async () => await dropTest(item.id_test)}>
												Удалить навсегда
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
