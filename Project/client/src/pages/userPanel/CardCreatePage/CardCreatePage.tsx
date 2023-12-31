import styles from './cardCreatePage.module.scss'
import { useEffect, useState } from 'react'
import { ICreateCardRequest } from '../../../api/cards/reg/createCard.ts'
import { useGetAllCards } from '../../../query/panelTeacher/allCards.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { toast, ToastContainer } from 'react-toastify'
import { useCreateCard } from '../../../query/panelTeacher/createCard.ts'
import useGetThemes from '../../../query/panelTeacher/allThemesForCards.ts'

export const UserCardCreatePage = () => {
	const newCardInitState: ICreateCardRequest = {
		theme_id: 1,
		word: '',
		correctAnswer: '',
		cardName: '',
	}

	const [newCard, setNewCard] = useState<ICreateCardRequest>(newCardInitState)

	const { data, fetchNextPage, hasNextPage } = useGetAllCards()
	const { data: themes, isFetching: fetchingTheme } = useGetThemes()
	const [search, setSearch] = useState('')

	const {
		mutateAsync: createCard,
		isError: isCreateError,
		error: createError,
	} = useCreateCard()

	useEffect(() => {
		if (isCreateError)
			toast(createError?.field + ' ' + createError.message, { type: 'error' })
	}, [createError?.field, createError?.message, isCreateError])

	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div>
					<div className={styles.modal}>
						<h3 className={styles.name}>Создание карточки</h3>
						<div className={styles.div}>
							<p>Тема</p>
							<select
								name='themeselect'
								id='themeselectnew'
								value={newCard?.theme_id}
								className={styles.input}
								onChange={e => {
									console.log(e)
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
								maxLength={50}
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
								maxLength={50}
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
								className={styles.input}
								maxLength={50}
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
								disabled={newCard.cardName === ''}
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
