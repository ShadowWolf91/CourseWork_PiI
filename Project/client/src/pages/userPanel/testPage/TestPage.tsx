import { useState } from 'react'
import styles from './testPage.module.scss'
import { ToastContainer } from 'react-toastify'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import useGetTests from '../../../query/userPanel/getTestsByThemeId.ts'

export const UserTestPage = () => {
	const { data, error, isLoading } = useGetTests()

	const [search, setSearch] = useState('')

	if (isLoading) return <h2>Loading...</h2>
	if (error) return <p>Error</p>
	if (!data) return <p>Данных нету</p>
	if (!data.test) return <p>Данных нету</p>
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{data?.test
						.filter(
							item => item?.question.toLowerCase().includes(search.toLowerCase())
						)
						.map(item => (
							<div className={styles.card} key={item?.id_test}>
								<p>{item?.question}</p>
								<div>
									<div>
										<p>A: {item?.optionA}</p>
										<p>B: {item?.optionB}</p>
										<p>C: {item?.optionC}</p>
										<p>D: {item?.optionD}</p>
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
