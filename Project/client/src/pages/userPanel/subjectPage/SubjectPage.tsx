import styles from './subjectPage.module.scss'
import { useState } from 'react'
import { useGetAllSubjects } from '../../../query/panelAdmin/allSubjects.ts'
//import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
//import useGetThemes from '../../../query/userPanel/getThemesBySubjectId.ts'
//import { Button } from 'react-bootstrap'

export const UserSubjectsPage = () => {
	const [selectedSubject, setSelectedSubject] = useState<{
		[subject_id: number]: boolean
	}>({})

	const navigate = useNavigate()

	const { data: subjects, error, isLoading } = useGetAllSubjects()
	//const { data: themes } = useGetThemes()
	if (isLoading) return <h2>Loading...</h2>
	if (error) return <p>Error</p>

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{subjects?.pages.map(page =>
						page.subjectsData.map(item => (
							<div
								className={styles.card}
								style={{
									border: `1px solid ${selectedSubject[item.id_subject]}`,
								}}
								key={item.id_subject}
								onClick={() =>
									setSelectedSubject(prev => ({
										...prev,
										[item.id_subject]: !prev[item.id_subject],
									}))
								}>
								<h3 className={styles.name}>{item.subjectName}</h3>
								<button
									onClick={() => navigate(`/user/subjects/${item.id_subject}`)}>
									Выбрать
								</button>
								<hr className={styles.line}></hr>
							</div>
						))
					)}
				</div>
			</div>
			<ToastContainer />
		</>
	)
}
