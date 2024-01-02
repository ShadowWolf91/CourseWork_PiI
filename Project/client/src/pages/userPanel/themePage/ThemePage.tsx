import { useQuery } from '@tanstack/react-query'
import { IErrorResponse } from '../../../api/errorResponse.ts'
import $api from '../../../query/axios/base.ts'
import { AxiosResponse, isAxiosError } from 'axios'
import { useState } from 'react'
import styles from './themePage.module.scss'
import { Modes } from '../../../api/enums.ts'
import ThemeEndpoints from '../../../api/themes/endpoints.ts'
import { useParams } from 'react-router-dom'
// import useVirtualStore from '../../../store'
import { useGetAllThemes } from '../../../query/panelTeacher/allThemes.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { ToastContainer } from 'react-toastify'
import {
	IGetBySubjectIdRequest,
	IGetBySubjectIdResponse,
} from '../../../api/themes/reg/getBySubjectId.ts'

export const UserThemePage = () => {
	// const { userId } = useVirtualStore()

	const { subject_id } = useParams()
	const { data, error, isLoading } = useQuery<
		IGetBySubjectIdRequest,
		IErrorResponse,
		IGetBySubjectIdResponse,
		['subject']
	>({
		queryKey: ['subject'],
		queryFn: async () => {
			try {
				const result = await $api.get<
					IGetBySubjectIdResponse,
					AxiosResponse<IGetBySubjectIdResponse>
				>(`${ThemeEndpoints.BASE}${ThemeEndpoints.GET_BY_SUBJECT_ID}`, {
					params: {
						subject_id,
					},
				})

				setThemesModal(
					result.data.themes.map(item => ({
						id_theme: item?.id_theme || 1,
						themeName: item?.themeName || '',
						questionAmount: item?.questionAmount,
						mode: (item.mode as Modes) || Modes.TEST,
						time: item?.time || 10,
					}))
				)
				return result.data
			} catch (e) {
				if (isAxiosError(e)) return e?.response?.data
				return e
			}
		},
		refetchOnWindowFocus: false,
		retry: false,
	})

	const [search, setSearch] = useState('')

	const [searchTheme, setSearchTheme] = useState('')
	const { data: themesData } = useGetAllThemes(searchTheme)

	const [themesModal, setThemesModal] = useState(
		[] as {
			id_theme: number
			themeName: string
			questionAmount: number
			mode: Modes
			time: number
		}[]
	)
	console.log(data)

	if (isLoading) return <h2>Loading...</h2>
	if (error) return <p>Error</p>
	if (!data) return <p>Данных нету</p>
	if (!data.themes) return <p>Данных нету</p>
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput search={search} onChange={e => setSearch(e.target.value)} />
			</div>
			<div className={styles.container}>
				<div className={styles.modal}>
					<>
						<p>Добавление продукта</p>
						<div>
							<input
								type='text'
								value={searchTheme}
								onChange={e => setSearchTheme(e.target.value)}
							/>
							{searchTheme && (
								<div className={styles.themeListContainer}>
									{themesData?.pages.map(page =>
										page.themesData.map(theme => (
											<div
												key={theme.id_theme}
												onClick={() => {
													setThemesModal(prev => {
														if (
															prev.find(
																item => item.id_theme === theme.id_theme
															)
														)
															return prev
														return [
															...prev,
															{
																id_theme: theme.id_theme,
																mode: Modes.TEST,
																questionAmount: 0,
																themeName: theme.themeName,
																time: theme.time,
															},
														]
													})
												}}>
												{theme.themeName}
											</div>
										))
									)}
								</div>
							)}
							<div>
								<p>Состав рецепта:</p>
								<div
									style={{
										display: 'flex',
										flexDirection: 'row',
										justifyContent: 'space-around',
									}}>
									<p>Название | </p>
									<p>Кол-во | </p>
									<p>Размерность</p>
								</div>
								{themesModal.map(item => (
									<div
										key={item.id_theme}
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-around',
											alignItems: 'center',
											gap: '5%',
										}}>
										<p>{item.themeName}</p>
										<input
											type='number'
											value={item.questionAmount}
											step={1}
											onChange={e =>
												setThemesModal(prev =>
													prev.map(theme => {
														if (theme.id_theme !== item.id_theme)
															return theme
														return {
															...theme,
															questionAmount: +e.target.value,
														}
													})
												)
											}
										/>
										<p>{item.mode}</p>
										<div
											onClick={() =>
												setThemesModal(prev =>
													prev.filter(
														theme => theme.id_theme !== item.id_theme
													)
												)
											}>
											X
										</div>
									</div>
								))}
							</div>
						</div>
						<div>
							<button onClick={() => setThemesModal([])}>Очистить</button>
						</div>
					</>
				</div>
				<div className={styles.cardsContainer}>
					{data?.themes
						.filter(
							item => item?.themeName.toLowerCase().includes(search.toLowerCase())
						)
						.map(item => (
							<div className={styles.card} key={item?.id_theme}>
								<p>{item?.themeName}</p>
								<div>
									<div>
										<p>Название: {item?.themeName}</p>
										<p>Режим: {item?.mode}</p>
										<p>Кол-во вопросов: {item?.questionAmount}</p>
										<p>Время: {item?.time}</p>
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
