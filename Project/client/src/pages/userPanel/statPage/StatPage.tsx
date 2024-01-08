// import styles from './statPage.module.scss'
// import { useGetStat } from '../../../query/userPanel/getStatisticdsByUserId'
// import { ToastContainer } from 'react-toastify'

// export const StatsPage = () => {
// 	const { data } = useGetStat()
// 	console.log

// 	return (
// 		<>
// 			<div className={styles.container}>
// 				<div className={styles.cardsContainer}>
// 					{data?.map(page =>
// 						page.statisticsData.map(item => (
// 							<div className={styles.card} key={item.id}>
// 								<h3 className={styles.name}>
// 									Результат: {item.statistics.rightAnswered}/
// 									{item.statistics.mark}
// 								</h3>
// 								<p>Пользователь: {item.user?.username}</p>
// 								<p>Тема: {item.theme.themeName}</p>
// 								<p>Режим: {item.theme.mode}</p>
// 								<div>
// 									<div className={styles.cardEditBar}></div>
// 								</div>
// 								<hr className={styles.line}></hr>
// 							</div>
// 						))
// 					)}
// 				</div>
// 				<ToastContainer />
// 			</div>
// 		</>
// 	)
// }
