import styles from './cardPage.module.scss'
import { useEffect, useState } from 'react'
import { ICreateCardRequest } from '../../../api/cards/reg/createCard.ts'
import { IUpdateCardRequest } from '../../../api/cards/reg/updateCard.ts'
import { useGetAllCards } from '../../../query/panelTeacher/allCards.ts'
import { useDropCard } from '../../../query/panelTeacher/deleteCard.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { toast, ToastContainer } from 'react-toastify'
import { useCreateCard } from '../../../query/panelTeacher/createCard.ts'
import { useUpdateCard } from '../../../query/panelTeacher/updateCard.ts'
import useGetThemes from '../../../query/panelTeacher/allThemesForCards.ts'

export const CardsPage = () => {
	const [selectedCard, setSelectedCard] = useState<IUpdateCardRequest>(
		{} as IUpdateCardRequest
	)

	const newCardInitState: ICreateCardRequest = {
		theme_id: 0,
		word: '',
		correctAnswer: '',
		cardName: '',
	}

	const [newCard, setNewCard] = useState<ICreateCardRequest>(newCardInitState)

	const { data, fetchNextPage, hasNextPage } = useGetAllCards()
	const { data: themes, isFetching: fetchingTheme } = useGetThemes()
	const [search, setSearch] = useState('')

	const { dropCard } = useDropCard()

	const {
		mutateAsync: createCard,
		isError: isCreateError,
		error: createError,
	} = useCreateCard()

	const {
		mutateAsync: updateCard,
		isError: isUpdateError,
		error: updateError,
	} = useUpdateCard()

	useEffect(() => {
		if (isCreateError)
			toast(createError?.field + ' ' + createError.message, { type: 'error' })
		if (isUpdateError)
			toast(updateError?.field + ' ' + updateError.message, { type: 'error' })
	}, [
		createError?.field,
		createError?.message,
		isCreateError,
		isUpdateError,
		updateError?.field,
		updateError?.message,
	])

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div className={styles.modal}>
					{Object.keys(selectedCard).length ? (
						<div className={styles.modal}>
							<p>Редактирование карточки</p>
							<div className={styles.div}>
								<p>Слово</p>
								<input
									type='text'
									className={styles.input}
									value={selectedCard.word}
									maxLength={20}
									onChange={e =>
										setSelectedCard(prev => ({
											...prev,
											word: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Правильный ответ</p>
								<input
									type='text'
									className={styles.input}
									value={selectedCard.correctAnswer}
									maxLength={20}
									onChange={e =>
										setSelectedCard(prev => ({
											...prev,
											correctAnswer: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Название карточки</p>
								<input
									type='text'
									className={styles.input}
									value={selectedCard.cardName}
									maxLength={20}
									onChange={e =>
										setSelectedCard(prev => ({
											...prev,
											cardName: e.target.value,
										}))
									}
								/>
							</div>
							<div>
								<button
									disabled={selectedCard.cardName === ''}
									onClick={async () => {
										await updateCard(selectedCard)
										setSelectedCard({} as IUpdateCardRequest)
									}}>
									Сохранить
								</button>
								<button onClick={() => setSelectedCard({} as IUpdateCardRequest)}>
									Отменить
								</button>
							</div>
						</div>
					) : (
						<div className={styles.modal}>
							<p>Создание карточки</p>
							<div className={styles.div}>
								<p>Тема</p>
								<select
									name='themeselect'
									id='themeselectnew'
									value={newCard?.theme_id}
									onChange={e => {
										setNewCard(prev => ({
											...prev,
											theme_id: +e.target.value,
										}))
									}}>
									{!fetchingTheme &&
										themes?.map(theme => (
											<option value={theme.id_theme}>{theme.themeName}</option>
										))}
								</select>
							</div>
							<div className={styles.div}>
								<p>Слово</p>
								<input
									type='text'
									className={styles.input}
									value={newCard.word}
									maxLength={20}
									onChange={e =>
										setNewCard(prev => ({
											...prev,
											word: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Правильный ответ</p>
								<input
									type='text'
									className={styles.input}
									value={newCard.correctAnswer}
									maxLength={20}
									onChange={e =>
										setNewCard(prev => ({
											...prev,
											correctAnswer: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.div}>
								<p>Название карточки</p>
								<input
									type='text'
									value={newCard.cardName}
									maxLength={20}
									onChange={e =>
										setNewCard(prev => ({
											...prev,
											cardName: e.target.value,
										}))
									}
								/>
							</div>
							<div className={styles.buttons}>
								<button
									//disabled={newCard.cardName === ''}
									onClick={async () => {
										await createCard({
											newCard,
										})
										setNewCard(newCardInitState)
									}}>
									Сохранить
								</button>
								<button onClick={() => setNewCard(newCardInitState)}>
									Отменить
								</button>
							</div>
						</div>
					)}
				</div>
				<div className={styles.cardsContainer}>
					{data?.pages.map(page =>
						page.cardsData
							.filter(item =>
								item.cardName.toLowerCase().includes(search.toLowerCase())
							)
							.map(item => (
								<div className={styles.card} key={item.id_card}>
									<p>{item.cardName}</p>
									<div>
										<div>
											<p>Слово: {item.word}</p>
										</div>
										<div className={styles.cardEditBar}>
											<button
												onClick={() =>
													setSelectedCard({
														id_card: item.id_card,
														cardName: item.cardName,
														word: item.word,
														correctAnswer: item.correctAnswer,
													})
												}>
												Редактировать
											</button>
											<button
												className={styles.redButton}
												onClick={async () => await dropCard(item.id_card)}>
												Удалить навсегда
											</button>
										</div>
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
