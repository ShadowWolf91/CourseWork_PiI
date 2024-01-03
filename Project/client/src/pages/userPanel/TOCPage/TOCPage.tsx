import { useEffect, useState } from 'react'
import styles from './tocPage.module.scss'
import { ToastContainer } from 'react-toastify'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import useGetTests from '../../../query/userPanel/getTestsByThemeId.ts'
import useGetCards from '../../../query/panelTeacher/getCardsByThemeId.ts'
import useGetOpenQuestion from '../../../query/userPanel/getOpenQuestionsByThemeId.ts'

export const UserTOCPage = () => {
	const { data: testData, error: testError, isLoading: isTestLoading } = useGetTests()
	const { data: cardData, error: cardError, isLoading: isCardLoading } = useGetCards()
	const {
		data: openQuestionData,
		error: openQuestionError,
		isLoading: isOpenQuestionLoading,
	} = useGetOpenQuestion()

	const [search, setSearch] = useState('')
	const [showCardAnswer, setShowCardAnswer] = useState(
		cardData?.card.reduce(
			(prev, curr) => ({ ...prev, [curr.id_card]: false }),
			{} as { [x: number]: boolean }
		)
	)

	useEffect(
		() =>
			setShowCardAnswer(
				cardData?.card.reduce(
					(prev, curr) => ({ ...prev, [curr.id_card]: false }),
					{} as { [x: number]: boolean }
				)
			),
		[cardData]
	)

	if (isTestLoading || isCardLoading || isOpenQuestionLoading) return <h2>Loading...</h2>
	if (testError || cardError || openQuestionError) return <p>Error</p>
	if (!testData || !cardData || !openQuestionData) return <p>Данных нету</p>
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{testData?.test
						.filter(
							item => item?.question.toLowerCase().includes(search.toLowerCase())
						)
						.map((item, i) => (
							<div className={styles.card} key={item?.id_test}>
								<p>{item?.question}</p>
								<div>
									<div>
										<label htmlFor={`card1${i}`}>A: {item?.optionA}</label>
										<input
											id={`card1${i}`}
											type='radio'
											value={item?.optionA}
											name={`card${i}`}
										/>{' '}
										<label htmlFor={`card2${i}`}>B: {item?.optionB}</label>
										<input
											id={`card2${i}`}
											type='radio'
											value={item?.optionB}
											name={`card${i}`}
										/>{' '}
										<label htmlFor={`card3${i}`}>C: {item?.optionC}</label>
										<input
											id={`card3${i}`}
											type='radio'
											value={item?.optionC}
											name={`card${i}`}
										/>{' '}
										<label htmlFor={`card4${i}`}>D: {item?.optionD}</label>
										<input
											id={`card4${i}`}
											type='radio'
											value={item?.optionD}
											name={`card${i}`}
										/>
										{/* <p>A: {item?.optionA}</p>
										<p>B: {item?.optionB}</p>
										<p>C: {item?.optionC}</p>
										<p>D: {item?.optionD}</p> */}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{cardData?.card
						.filter(item => item?.word.toLowerCase().includes(search.toLowerCase()))
						.map(item => (
							<div className={styles.card} key={item?.id_card}>
								<p>{item?.word}</p>
								<div>
									<div>
										{showCardAnswer && !showCardAnswer[item.id_card] && (
											<button
												onClick={() =>
													setShowCardAnswer(prev => ({
														...prev,
														[item.id_card]: true,
													}))
												}>
												Проверка
											</button>
										)}
										{showCardAnswer && showCardAnswer[item.id_card] && (
											<p>Ответ: {item?.correctAnswer}</p>
										)}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className={styles.container}>
				<div className={styles.cardsContainer}>
					{openQuestionData?.openQuestion
						.filter(
							item => item?.question.toLowerCase().includes(search.toLowerCase())
						)
						.map(item => (
							<div className={styles.card} key={item?.id_openQuestion}>
								<p>{item?.question}</p>
								<div>
									<div>
										<input
											type='text'
											// value={item.correctAnswer}
											maxLength={20}
										/>
										{/* <p>Ответ: {item?.correctAnswer}</p> */}
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
