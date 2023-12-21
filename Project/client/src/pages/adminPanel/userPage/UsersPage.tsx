import styles from './usersPage.module.scss'
import { useState } from 'react'
import { ICreateUserRequest } from '../../../api/users/reg/createUser.ts'
import { Roles } from '../../../api/enums.ts'
import { SearchInput } from '../../../components/searchInput/searchInput.tsx'
import { useGetAllUsers } from '../../../query/panelAdmin/allUsers.ts'
import { useDropUser } from '../../../query/panelAdmin/deleteUser.ts'
import { SelectedUser } from '../../../query/panelAdmin/updateUser.ts'
import { UserCreationForm } from '../../../components/Form/Form.tsx'

export const UsersPage = () => {
	const newUserInitState = {
		username: '',
		role: Roles.DEFAULT,
		password: '',
	}

	const [search, setSearch] = useState('')
	const [selectedUser, setSelectedUser] = useState<SelectedUser>(null)
	const [newUser, setNewUser] = useState<ICreateUserRequest>(newUserInitState)

	const { data, error, fetchNextPage, hasNextPage, isLoading } = useGetAllUsers()
	const { mutateAsync: dropUser } = useDropUser()

	if (error) return <p>Error</p>
	if (isLoading) return <h2>Loading...</h2>
	return (
		<>
			<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
				<SearchInput
					search={search}
					onChange={e => setSearch(e.target.value)}></SearchInput>
			</div>
			<div className={styles.container}>
				<UserCreationForm
					selectedUser={selectedUser}
					setSelectedUser={setSelectedUser}
					newUser={newUser}
					setNewUser={setNewUser}
					newUserInitState={newUserInitState}
				/>
				<div className={styles.cardsContainer}>
					{data?.pages.map(
						page =>
							page.usersData
								?.filter(
									item =>
										item?.username.toLowerCase().includes(search.toLowerCase())
								)
								.map(item => (
									<div className={styles.card} key={item.id_user}>
										<p>{item.username}</p>
										<div>
											<div className={styles.cardEditBar}>
												<button
													onClick={() =>
														setSelectedUser({
															id_user: item.id_user,
															username: item.username,
															password: '',
														})
													}>
													Редактировать
												</button>
												{
													<button
														className={styles.redButton}
														onClick={async () =>
															await dropUser(item.id_user)
														}>
														Удалить навсегда
													</button>
												}
											</div>
										</div>
									</div>
								))
					)}
					{hasNextPage && <button onClick={() => fetchNextPage()}>Ещё</button>}
				</div>
			</div>
		</>
	)
}
