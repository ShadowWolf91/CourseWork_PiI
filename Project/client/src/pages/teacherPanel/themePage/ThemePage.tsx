import styles from './themePage.module.scss'
import { useEffect, useState } from 'react'
import { ICreateThemeRequest } from '../../../api/themes/reg/createTheme.ts'
import { IUpdateThemeRequest } from '../../../api/themes/reg/updateTheme.ts'
import { useGetAllThemes } from '../../../query/panelTeacher/allThemes.ts'
import { useDropTheme } from '../../../query/panelTeacher/deleteTheme.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { toast, ToastContainer } from 'react-toastify'
import { useCreateTheme } from '../../../query/panelTeacher/createTheme.ts'
import { useUpdateTheme } from '../../../query/panelTeacher/updateTheme.ts'
import { Modes } from '../../../api/enums.ts'

export const ThemesPage = () => {
	const [selectedTheme, setSelectedTheme] = useState<IUpdateThemeRequest>(
		{} as IUpdateThemeRequest
	)

	const newThemeInitState: ICreateThemeRequest = {
		subject_id: 0,
		themeName: '',
		mode: 'TEST',
		questionAmount: 0,
		time: 0,
	}

	const [newTheme, setNewTheme] = useState<ICreateThemeRequest>(newThemeInitState)

	const { data, fetchNextPage, hasNextPage } = useGetAllThemes()
	const [search, setSearch] = useState('')

	const { dropTheme } = useDropTheme()

	const {
		mutateAsync: createTheme,
		isError: isCreateError,
		error: createError,
	} = useCreateTheme()

	const {
		mutateAsync: updateTheme,
		isError: isUpdateError,
		error: updateError,
	} = useUpdateTheme()

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
					{Object.keys(selectedTheme).length ? (
						<div className={styles.modal}>
							<p>Редактирование темы</p>
							<div className={styles.div}>
								<p>ID темы</p>
								<input
									type='number'
									step={1}
									max={32767}
									value={selectedTheme.id_theme}
									onChange={e =>
										setSelectedTheme(prev => ({
											...prev,
											id_theme: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>ID предмета</p>
								<input
									type='number'
									step={1}
									max={32767}
									value={selectedTheme.subject_id}
									onChange={e =>
										setSelectedTheme(prev => ({
											...prev,
											subject_id: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Название темы</p>
								<input
									type='text'
									className={styles.input}
									value={selectedTheme.themeName}
									maxLength={20}
									onChange={e =>
										setSelectedTheme(prev => ({
											...prev,
											themeName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Режим</p>
								<select
									name='modesselect'
									id='modesselectnew'
									value={selectedTheme.mode}
									onChange={e =>
										setSelectedTheme(prev => ({
											...prev,
											mode: e.target.value as Modes,
										}))
									}>
									{Object.values(Modes).map(mode => (
										<option value={mode}>{mode}</option>
									))}
								</select>
							</div>
							<div className={styles.div}>
								<p>Кол-во вопросов</p>
								<input
									type='number'
									step={1}
									max={20}
									value={selectedTheme.questionAmount}
									onChange={e =>
										setSelectedTheme(prev => ({
											...prev,
											questionAmount: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Время</p>
								<input
									type='number'
									step={1}
									max={20}
									value={selectedTheme.time}
									onChange={e =>
										setSelectedTheme(prev => ({
											...prev,
											time: +e.target.value,
										}))
									}
								/>
							</div>
							<div>
								<button
									disabled={selectedTheme.themeName === ''}
									onClick={async () => {
										await updateTheme(selectedTheme)
										setSelectedTheme({} as IUpdateThemeRequest)
									}}>
									Сохранить
								</button>
								<button
									onClick={() => setSelectedTheme({} as IUpdateThemeRequest)}>
									Отменить
								</button>
							</div>
						</div>
					) : (
						<div className={styles.modal}>
							<p>Создание темы</p>
							<div className={styles.div}>
								<p>ID предмета</p>
								<input
									type='number'
									step={1}
									max={32767}
									value={newTheme.subject_id}
									onChange={e =>
										setNewTheme(prev => ({
											...prev,
											subject_id: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Название темы</p>
								<input
									type='text'
									className={styles.input}
									value={newTheme.themeName}
									maxLength={20}
									onChange={e =>
										setNewTheme(prev => ({
											...prev,
											themeName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Режим</p>
								<select
									name='modesselect'
									id='modesselectnew'
									value={newTheme.mode}
									onChange={e =>
										setNewTheme(prev => ({
											...prev,
											mode: e.target.value as Modes,
										}))
									}>
									{Object.values(Modes).map(mode => (
										<option value={mode}>{mode}</option>
									))}
								</select>
							</div>
							<div className={styles.div}>
								<p>Кол-во вопросов</p>
								<input
									type='number'
									step={1}
									max={20}
									value={selectedTheme.questionAmount}
									onChange={e =>
										setNewTheme(prev => ({
											...prev,
											questionAmount: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Время</p>
								<input
									type='number'
									step={1}
									max={20}
									value={selectedTheme.time}
									onChange={e =>
										setNewTheme(prev => ({
											...prev,
											time: +e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.buttons}>
								<button
									disabled={newTheme.themeName === ''}
									onClick={async () => {
										await createTheme(newTheme)
										setNewTheme(newThemeInitState)
									}}>
									Сохранить
								</button>
								<button onClick={() => setNewTheme(newThemeInitState)}>
									Отменить
								</button>
							</div>
						</div>
					)}
				</div>
				<div className={styles.cardsContainer}>
					{data?.pages.map(page =>
						page.themesData
							.filter(item =>
								item.themeName.toLowerCase().includes(search.toLowerCase())
							)
							.map(item => (
								<div className={styles.card} key={item.id_theme}>
									<p>{item.themeName}</p>
									<div>
										<div>
											<p>Название темы: {item.themeName}</p>
											<p>Режим: {item.mode}</p>
											<p>Кол-во вопросов: {item.questionAmount}</p>
										</div>
										<div className={styles.cardEditBar}>
											<button
												onClick={() =>
													setSelectedTheme({
														id_theme: item.id_theme,
														themeName: item.themeName,
														questionAmount: item.questionAmount,
														time: item.time,
														mode: item.mode,
													})
												}>
												Редактировать
											</button>
											<button
												className={styles.redButton}
												onClick={async () => await dropTheme(item.id_theme)}>
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
