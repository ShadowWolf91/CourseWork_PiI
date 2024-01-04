import { useQuery } from '@tanstack/react-query'
import { AxiosResponse, isAxiosError } from 'axios'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IErrorResponse } from '../../../api/errorResponse.ts'
import ThemeEndpoints from '../../../api/themes/endpoints.ts'
import $api from '../../../query/axios/base.ts'
import styles from './themePage.module.scss'
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
	const { setCredentials, id_user, device_id, role, username } = useVirtualStore()
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
											themeId: item.id_theme,
										})
										setCredentials({
											id_user,
											device_id,
											role,
											username,
											statisticId: Number(result.statisticId).toString(),
										})
										navigate(
											`/user/subjects/${item.themeName}/${item.id_theme}`
										)
									}}>
									Пройти
								</button>
							</div>
						))}
				</div>
			</div>
			<ToastContainer />
		</>
	)
}
