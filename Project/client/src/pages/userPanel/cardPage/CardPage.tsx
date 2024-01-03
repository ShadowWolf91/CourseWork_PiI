import { useState } from 'react'
import styles from './cardPage.module.scss'
import { ToastContainer } from 'react-toastify'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { useGetCards } from '../../../query/panelTeacher/getCardsByThemeId.ts'
import Timer from '../../../components/timer/Timer.tsx'

export const UserCardPage = () => {
	const { data, error, isLoading } = useGetCards()

	const [search, setSearch] = useState('')

	if (isLoading) return <h2>Loading...</h2>
	if (error) return <p>Error</p>
	if (!data) return <p>Данных нету</p>
	if (!data.card) return <p>Данных нету</p>
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
				<Timer timeLimit={15} />
			</div>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{data?.card
						.filter(item => item?.word.toLowerCase().includes(search.toLowerCase()))
						.map(item => (
							<div className={styles.card} key={item?.id_card}>
								<p>{item?.word}</p>
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
