import styles from './statPage.module.scss'
import { useGetAllStats } from '../../../query/panelTeacher/allStat.ts'
import { ToastContainer } from 'react-toastify'

export const StatsPage = () => {
	const { data, fetchNextPage, hasNextPage } = useGetAllStats()
	console.log

	return (
		<>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{data?.pages.map(page =>
						page.statisticsData.map(item => (
							<div className={styles.card} key={item.id}>
								<h3 className={styles.name}>
									Результат: {item.statistics.rightAnswered}/
									{item.statistics.mark}
								</h3>
								<p>Пользователь: {item.user?.username}</p>
								<p>Тема: {item.theme.themeName}</p>
								<p>Режим: {item.theme.mode}</p>
								<div>
									<div className={styles.cardEditBar}></div>
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
