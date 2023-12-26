import styles from './SubjectPage.module.scss'
import { useState } from 'react'
import { useGetAllSubjects } from '../../../query/panelAdmin/allSubjects.ts'
//import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { ToastContainer } from 'react-toastify'
//import { Button } from 'react-bootstrap'

export const UserSubjectsPage = () => {
	const [selectedSubject, setSelectedSubject] = useState<{
		[subject_id: number]: boolean
	}>({})

	const { data, error, isLoading } = useGetAllSubjects()

	if (isLoading) return <h2>Loading...</h2>
	if (error) return <p>Error</p>

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{data?.pages.map(page =>
						page.subjectsData.map(item => (
							<div
								className={styles.card}
								style={{
									border: `1px solid ${
										selectedSubject[item.id_subject] ? 'red' : 'white'
									}`,
								}}
								key={item.id_subject}
								onClick={() =>
									setSelectedSubject(prev => ({
										...prev,
										[item.id_subject]: !prev[item.id_subject],
									}))
								}>
								<p>{item.subjectName}</p>
							</div>
						))
					)}
				</div>
			</div>
			<ToastContainer />
		</>
	)
}
