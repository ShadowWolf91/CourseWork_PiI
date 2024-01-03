import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, isAxiosError } from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IErrorResponse } from '../../../api/errorResponse.ts'
import ThemeEndpoints from '../../../api/themes/endpoints.ts'
import $api from '../../../query/axios/base.ts'
import styles from './themePage.module.scss'
//import useVirtualStore from '../../../store'
import { ToastContainer } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {
	IGetBySubjectIdRequest,
	IGetBySubjectIdResponse,
} from '../../../api/themes/reg/getBySubjectId.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { useCreateSession } from '../../../query/panelTeacher/createSession.ts'
import useVirtualStore from '../../../store/index.ts'

export const UserThemePage = () => {
	const { setCredentials, id_user, device_id, role, username, checkStorageHealth } =
		useVirtualStore()
	const navigate = useNavigate()
	const { subject_id } = useParams()
	const { mutateAsync: createSession } = useCreateSession()
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
				{/* <div className={styles.modal}>
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
				</div> */}
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
										{/* <p>Название: {item?.themeName}</p> */}
										<p>Режим: {item?.mode}</p>
									</div>
								</div>
								<button
									onClick={async () => {
										const result = await createSession({
											id_theme: item.id_theme,
										})
										console.log(item)

										setCredentials({
											id_user,
											device_id,
											role,
											username,
											statisticId: result.statisticId,
										})
										navigate(
											`/user/subjects/${item.themeName}/${item.id_theme}`
										)
									}}>
									Выбрать
								</button>
							</div>
						))}
				</div>
			</div>
			<ToastContainer />
		</>
	)
}
