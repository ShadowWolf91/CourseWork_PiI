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
import useGetSubjects from '../../../query/panelTeacher/allSubjects.ts'

export const ThemesPage = () => {
	const [selectedTheme, setSelectedTheme] = useState<IUpdateThemeRequest>(
		{} as IUpdateThemeRequest
	)

	const { data, fetchNextPage, hasNextPage } = useGetAllThemes()
	const { data: subjects, isFetching: fetchingSubject } = useGetSubjects()
	const [search, setSearch] = useState('')

	const newThemeInitState: ICreateThemeRequest = {
		subject_id: 0,
		themeName: '',
		mode: 'TEST',
	}

	const [newTheme, setNewTheme] = useState<ICreateThemeRequest>(
		(subjects && {
			subject_id: subjects[0].id_subject,
			themeName: '',
			mode: 'TEST',
		}) ||
			newThemeInitState
	)

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
				<div>
					{Object.keys(selectedTheme).length ? (
						<div className={styles.modal}>
							<h3 className={styles.name}>Редактирование темы</h3>
							<div className={styles.div}>
								<p>Название темы</p>
								<input
									type='text'
									className={styles.input}
									value={selectedTheme.themeName}
									maxLength={50}
									onChange={e =>
										setSelectedTheme(prev => ({
											...prev,
											themeName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.buttons}>
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
							<h3 className={styles.name}>Создание темы</h3>
							<div className={styles.div}>
								<p>Название темы</p>
								<input
									type='text'
									className={styles.input}
									value={newTheme.themeName}
									maxLength={50}
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
									className={styles.input}
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
								<p>Предмет</p>
								<select
									name='subjectselect'
									id='subjectselectnew'
									className={styles.input}
									value={newTheme?.subject_id}
									onChange={e => {
										setNewTheme(prev => ({
											...prev,
											subject_id: +e.target.value,
										}))
									}}>
									{!fetchingSubject &&
										subjects?.map(subject => (
											<option value={subject.id_subject}>
												{subject.subjectName}
											</option>
										))}
								</select>
							</div>
							<div className={styles.buttons}>
								<button
									disabled={newTheme.themeName === ''}
									onClick={async () => {
										await createTheme({
											newTheme,
										})
										setNewTheme(newThemeInitState)
									}}>
									Создать
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
											<p>Режим: {item.mode}</p>
										</div>
										<div className={styles.cardEditBar}>
											<button
												onClick={() =>
													setSelectedTheme({
														themeId: item.id_theme,
														themeName: item.themeName,
														mode: item.mode,
													})
												}>
												Редактировать
											</button>
											<button
												className={styles.redButton}
												onClick={async () => await dropTheme(item.id_theme)}>
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
