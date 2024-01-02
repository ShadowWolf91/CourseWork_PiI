import styles from './openQuestionPage.module.scss'
import { useEffect, useState } from 'react'
import { ICreateOpenQuestionRequest } from '../../../api/openQuestions/reg/createOpenQuestion.ts'
import { IUpdateOpenQuestionRequest } from '../../../api/openQuestions/reg/updateOpenQuestion.ts'
import { useGetAllOpenQuestions } from '../../../query/panelTeacher/allOpenQuestions.ts'
import { useDropOpenQuestion } from '../../../query/panelTeacher/deleteOpenQuestion.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { toast, ToastContainer } from 'react-toastify'
import { useCreateOpenQuestion } from '../../../query/panelTeacher/createOpenQuestion.ts'
import { useUpdateOpenQuestion } from '../../../query/panelTeacher/updateOpenQuestion.ts'
import useGetThemes from '../../../query/panelTeacher/allThemesForOpenQuestions.ts'

export const OpenQuestionsPage = () => {
	const [selectedOpenQuestion, setSelectedOpenQuestion] =
		useState<IUpdateOpenQuestionRequest>({} as IUpdateOpenQuestionRequest)

	const newOpenQuestionInitState: ICreateOpenQuestionRequest = {
		theme_id: 0,
		question: '',
		correctAnswer: '',
		openQuestionName: '',
		statistic_id: 0,
	}

	const [newOpenQuestion, setNewOpenQuestion] = useState<ICreateOpenQuestionRequest>(
		newOpenQuestionInitState
	)

	const { data, fetchNextPage, hasNextPage } = useGetAllOpenQuestions()
	const { data: themes, isFetching: fetchingTheme } = useGetThemes()
	const [search, setSearch] = useState('')

	const { dropOpenQuestion } = useDropOpenQuestion()

	const {
		mutateAsync: createOpenQuestion,
		isError: isCreateError,
		error: createError,
	} = useCreateOpenQuestion()

	const {
		mutateAsync: updateOpenQuestion,
		isError: isUpdateError,
		error: updateError,
	} = useUpdateOpenQuestion()

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
					{Object.keys(selectedOpenQuestion).length ? (
						<div className={styles.modal}>
							<p>Редактирование открытого вопроса</p>
							<div className={styles.div}>
								<p>ID открытого вопроса</p>
								<input
									type='number'
									step={1}
									value={selectedOpenQuestion.id_openQuestion}
									max={32767}
									onChange={e =>
										setSelectedOpenQuestion(prev => ({
											...prev,
											id_openQuestion: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>ID темы</p>
								<input
									type='number'
									step={1}
									value={selectedOpenQuestion.theme_id}
									max={32767}
									onChange={e =>
										setSelectedOpenQuestion(prev => ({
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
									value={selectedOpenQuestion.question}
									maxLength={20}
									onChange={e =>
										setSelectedOpenQuestion(prev => ({
											...prev,
											question: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Правильный ответ</p>
								<input
									type='text'
									className={styles.input}
									value={selectedOpenQuestion.correctAnswer}
									maxLength={20}
									onChange={e =>
										setSelectedOpenQuestion(prev => ({
											...prev,
											correctAnswer: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Название открытого вопроса</p>
								<input
									type='text'
									className={styles.input}
									value={selectedOpenQuestion.openQuestionName}
									maxLength={20}
									onChange={e =>
										setSelectedOpenQuestion(prev => ({
											...prev,
											openQuestionName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>ID статистики</p>
								<input
									type='number'
									step={1}
									value={selectedOpenQuestion.statistic_id}
									max={32767}
									onChange={e =>
										setSelectedOpenQuestion(prev => ({
											...prev,
											statistic_id: +e.target.value,
										}))
									}
								/>
							</div>
							<div>
								<button
									disabled={selectedOpenQuestion.openQuestionName === ''}
									onClick={async () => {
										await updateOpenQuestion(selectedOpenQuestion)
										setSelectedOpenQuestion({} as IUpdateOpenQuestionRequest)
									}}>
									Сохранить
								</button>
								<button
									onClick={() =>
										setSelectedOpenQuestion({} as IUpdateOpenQuestionRequest)
									}>
									Отменить
								</button>
							</div>
						</div>
					) : (
						<div className={styles.modal}>
							<p>Создание открытого вопроса</p>
							<div className={styles.div}>
								<p>Тема</p>
								<select
									name='themeselect'
									id='themeselectnew'
									value={newOpenQuestion?.theme_id}
									onChange={e => {
										setNewOpenQuestion(prev => ({
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
									value={newOpenQuestion.question}
									maxLength={20}
									onChange={e =>
										setNewOpenQuestion(prev => ({
											...prev,
											question: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Правильный ответ</p>
								<input
									type='text'
									className={styles.input}
									value={newOpenQuestion.correctAnswer}
									maxLength={20}
									onChange={e =>
										setNewOpenQuestion(prev => ({
											...prev,
											correctAnswer: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Название открытого вопроса</p>
								<input
									type='text'
									value={newOpenQuestion.openQuestionName}
									maxLength={20}
									onChange={e =>
										setNewOpenQuestion(prev => ({
											...prev,
											openQuestionName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>ID статистики</p>
								<input
									type='number'
									step={1}
									value={newOpenQuestion.statistic_id}
									max={32767}
									onChange={e =>
										setNewOpenQuestion(prev => ({
											...prev,
											statistic_id: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.buttons}>
								<button
									//disabled={newOpenQuestion.openQuestionName === ''}
									onClick={async () => {
										await createOpenQuestion({
											newOpenQuestion,
										})
										setNewOpenQuestion(newOpenQuestionInitState)
									}}>
									Сохранить
								</button>
								<button
									onClick={() => setNewOpenQuestion(newOpenQuestionInitState)}>
									Отменить
								</button>
							</div>
						</div>
					)}
				</div>
				<div className={styles.OpenQuestionsContainer}>
					{data?.pages.map(page =>
						page.openQuestionsData
							.filter(item =>
								item.openQuestionName.toLowerCase().includes(search.toLowerCase())
							)
							.map(item => (
								<div className={styles.card} key={item.id_openQuestion}>
									<p>{item.openQuestionName}</p>
									<div>
										<div className={styles.OpenQuestionEditBar}>
											<button
												onClick={() =>
													setSelectedOpenQuestion({
														id_openQuestion: item.id_openQuestion,
														openQuestionName: item.openQuestionName,
														question: item.question,
														correctAnswer: item.correctAnswer,
													})
												}>
												Редактировать
											</button>
											<button
												className={styles.redButton}
												onClick={async () =>
													await dropOpenQuestion(item.id_openQuestion)
												}>
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
