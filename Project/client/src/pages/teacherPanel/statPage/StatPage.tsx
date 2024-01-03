import styles from './statPage.module.scss'
import { useGetAllStats } from '../../../query/panelTeacher/allStat.ts'
import { ToastContainer } from 'react-toastify'

export const StatsPage = () => {
	const { data, fetchNextPage, hasNextPage } = useGetAllStats()

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{data?.pages.map(page =>
						page.statisticsData.map(item => (
							<div className={styles.card} key={item.id}>
								<p>
									{item.rightAnswered}/{item.mark}
								</p>
								<div>
									<div className={styles.OpenQuestionEditBar}></div>
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
