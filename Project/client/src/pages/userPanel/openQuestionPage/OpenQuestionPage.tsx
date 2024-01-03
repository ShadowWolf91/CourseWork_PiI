import { useState } from 'react'
import styles from './openQuestionPage.module.scss'
import { ToastContainer } from 'react-toastify'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import useGetOpenQuestion from '../../../query/userPanel/getOpenQuestionsByThemeId.ts'

export const UserOpenQuestionPage = () => {
	const { data, error, isLoading } = useGetOpenQuestion()

	const [search, setSearch] = useState('')

	if (isLoading) return <h2>Loading...</h2>
	if (error) return <p>Error</p>
	if (!data) return <p>Данных нету</p>
	if (!data.openQuestion) return <p>Данных нету</p>
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{data?.openQuestion
						.filter(
							item => item?.question.toLowerCase().includes(search.toLowerCase())
						)
						.map(item => (
							<div className={styles.card} key={item?.id_openQuestion}>
								<p>{item?.question}</p>
								<div>
									<div>
										<p>Ответ: {item?.correctAnswer}</p>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<ToastContainer />
		</>
	)
}
