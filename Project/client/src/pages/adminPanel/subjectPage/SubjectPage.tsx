import styles from './subjectPage.module.scss'
import { useEffect, useState } from 'react'
import { ICreateSubjectRequest } from '../../../api/subjects/reg/createSubject.ts'
import { IUpdateSubjectRequest } from '../../../api/subjects/reg/updateSubject.ts'
import { useGetAllSubjects } from '../../../query/panelAdmin/allSubjects.ts'
import { useDropSubject } from '../../../query/panelAdmin/deleteSubject.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { toast, ToastContainer } from 'react-toastify'
import { useCreateSubject } from '../../../query/panelAdmin/createSubject.ts'
import { useUpdateSubject } from '../../../query/panelAdmin/updateSubject.ts'

export const SubjectsPage = () => {
	const [selectedSubject, setSelectedSubject] = useState<IUpdateSubjectRequest>(
		{} as IUpdateSubjectRequest
	)

	const newSubjectInitState: ICreateSubjectRequest = {
		subjectName: '',
	}

	const [newSubject, setNewSubject] =
		useState<ICreateSubjectRequest>(newSubjectInitState)

	const { data, fetchNextPage, hasNextPage } = useGetAllSubjects()
	const [search, setSearch] = useState('')

	const { dropSubject } = useDropSubject()

	const {
		mutateAsync: createSubject,
		isError: isCreateError,
		error: createError,
	} = useCreateSubject()

	const {
		mutateAsync: updateSubject,
		isError: isUpdateError,
		error: updateError,
	} = useUpdateSubject()

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
					{Object.keys(selectedSubject).length ? (
						<div className={styles.modal}>
							<h3 className={styles.name}>Редактирование предмета</h3>
							<div className={styles.div}>
								<p>Название предмета</p>
								<input
									type='text'
									className={styles.input}
									value={selectedSubject.subjectName}
									maxLength={50}
									onChange={e =>
										setSelectedSubject(prev => ({
											...prev,
											subjectName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.buttons}>
								<button
									disabled={selectedSubject.subjectName === ''}
									onClick={async () => {
										await updateSubject(selectedSubject)
										setSelectedSubject({} as IUpdateSubjectRequest)
									}}>
									Сохранить
								</button>
								<button
									onClick={() =>
										setSelectedSubject({} as IUpdateSubjectRequest)
									}>
									Отменить
								</button>
							</div>
						</div>
					) : (
						<div className={styles.modal}>
							<h3 className={styles.name}>Создание предмета</h3>
							<div className={styles.div}>
								<p>Название предмета</p>
								<input
									className={styles.input}
									type='text'
									value={newSubject.subjectName}
									maxLength={50}
									onChange={e =>
										setNewSubject(prev => ({
											...prev,
											subjectName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.buttons}>
								<button
									disabled={newSubject.subjectName === ''}
									onClick={async () => {
										await createSubject(newSubject)
										setNewSubject(newSubjectInitState)
									}}>
									Сохранить
								</button>
								<button onClick={() => setNewSubject(newSubjectInitState)}>
									Отменить
								</button>
							</div>
						</div>
					)}
				</div>
				<div className={styles.cardsContainer}>
					{data?.pages.map(page =>
						page.subjectsData
							.filter(item =>
								item.subjectName.toLowerCase().includes(search.toLowerCase())
							)
							.map(item => (
								<div className={styles.card} key={item.id_subject}>
									<p>{item.subjectName}</p>
									<div>
										<div className={styles.cardEditBar}>
											<button
												onClick={() =>
													setSelectedSubject({
														id_subject: item.id_subject,
														subjectName: item.subjectName,
													})
												}>
												Редактировать
											</button>
											<button
												className={styles.redButton}
												onClick={async () =>
													await dropSubject(item.id_subject)
												}>
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
