import { useEffect, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import useGetCards from '../../../query/panelTeacher/getCardsByThemeId.ts'
import useGetOpenQuestion from '../../../query/userPanel/getOpenQuestionsByThemeId.ts'
import useGetTests from '../../../query/userPanel/getTestsByThemeId.ts'
import styles from './tocPage.module.scss'

export const UserTOCPage = () => {
	const { data: testData, error: testError, isLoading: isTestLoading } = useGetTests()
	const { data: cardData, error: cardError, isLoading: isCardLoading } = useGetCards()
	const {
		data: openQuestionData,
		error: openQuestionError,
		isLoading: isOpenQuestionLoading,
	} = useGetOpenQuestion()

	const [result, setResult] = useState({ correct: 0, total: 0 })

	const [search, setSearch] = useState('')
	const [showCardAnswer, setShowCardAnswer] = useState(
		cardData?.card.reduce(
			(prev, curr) => ({ ...prev, [curr.id_card]: false }),
			{} as { [x: number]: boolean }
		)
	)

	const [testAnswers, setTestAnswers] = useState(
		testData?.test.reduce(
			() => null,
			{} as { [x: number]: { isCorrect: boolean } } | null
		)
	)

	const [OCAnswers, setOCAnswers] = useState(
		openQuestionData?.openQuestion.reduce(
			() => ({}),
			{} as {
				[x: number]: { isCorrect: boolean; value: string }
			} | null
		)
	)

	const getTOCResult = () => {
		if (!OCAnswers || !testAnswers || !showCardAnswer) return
		const OC = Object.values(OCAnswers).filter(item => item.isCorrect).length
		const test = Object.values(testAnswers).filter(item => item.isCorrect).length
		const card = Object.values(showCardAnswer).filter(item => item).length

		setResult(prev => ({ ...prev, correct: OC + test + card }))
		console.log(OC + test + card)
	}

	useEffect(() => {
		setShowCardAnswer(
			cardData?.card.reduce(
				(prev, curr) => ({ ...prev, [curr.id_card]: false }),
				{} as { [x: number]: boolean }
			)
		)
		setTestAnswers(
			testData?.test.reduce(
				() => null,
				{} as { [x: number]: { isCorrect: boolean } } | null
			)
		)

		setOCAnswers(
			openQuestionData?.openQuestion.reduce(
				() => ({}),
				{} as {
					[x: number]: { isCorrect: boolean; value: string }
				} | null
			)
		)
	}, [cardData, testData, openQuestionData])
	useEffect(() => {
		setResult(prev => ({
			...prev,
			total: [
				...(testData?.test || []),
				...(openQuestionData?.openQuestion || []),
				...(cardData?.card || []),
			].length,
		}))
	}, [testData, cardData, openQuestionData])

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
											onClick={() =>
												setTestAnswers(prev => ({
													...prev,
													[item.id_test]: {
														isCorrect: item?.optionA === item.correctAnswer,
													},
												}))
											}
											disabled={!!testAnswers && !!testAnswers[item.id_test]}
											id={`card1${i}`}
											type='radio'
											value={item?.optionA}
											name={`card${i}`}
										/>
										<label htmlFor={`card2${i}`}>B: {item?.optionB}</label>
										<input
											onClick={() =>
												setTestAnswers(prev => ({
													...prev,
													[item.id_test]: {
														isCorrect: item?.optionB === item.correctAnswer,
													},
												}))
											}
											disabled={!!testAnswers && !!testAnswers[item.id_test]}
											id={`card2${i}`}
											type='radio'
											value={item?.optionB}
											name={`card${i}`}
										/>
										<label htmlFor={`card3${i}`}>C: {item?.optionC}</label>
										<input
											onClick={() =>
												setTestAnswers(prev => ({
													...prev,
													[item.id_test]: {
														isCorrect: item?.optionC === item.correctAnswer,
													},
												}))
											}
											disabled={!!testAnswers && !!testAnswers[item.id_test]}
											id={`card3${i}`}
											type='radio'
											value={item?.optionC}
											name={`card${i}`}
										/>
										<label htmlFor={`card4${i}`}>D: {item?.optionD}</label>
										<input
											onClick={() =>
												setTestAnswers(prev => ({
													...prev,
													[item.id_test]: {
														isCorrect: item?.optionD === item.correctAnswer,
													},
												}))
											}
											disabled={!!testAnswers && !!testAnswers[item.id_test]}
											id={`card4${i}`}
											type='radio'
											value={item?.optionD}
											name={`card${i}`}
										/>
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
											value={
												(OCAnswers &&
													OCAnswers[item.id_openQuestion].value) ||
												''
											}
											onChange={e =>
												setOCAnswers(prev => ({
													...prev,
													[item.id_openQuestion]: {
														value: e.target.value,
														isCorrect:
															e.target.value.trim() === item.correctAnswer,
													},
												}))
											}
											maxLength={20}
										/>
										{/* <p>Ответ: {item?.correctAnswer}</p> */}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<button onClick={getTOCResult}>Получить результат</button>
			<p>
				Результат: {result.correct}/{result.total}
			</p>
			<ToastContainer />
		</>
	)
}
