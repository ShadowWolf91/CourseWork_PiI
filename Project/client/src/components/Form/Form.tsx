import { Roles } from '../../api/enums.ts'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SelectedUser, useUpdateUser } from '../../query/panelAdmin/updateUser.ts'
import { ICreateUserRequest } from '../../api/users/reg/createUser.ts'
import { useCreateUser } from '../../query/panelAdmin/createUser.ts'
import styles from './Form.module.scss'
import { toast, ToastContainer } from 'react-toastify'

interface UserCreationFormProps {
	selectedUser: SelectedUser
	setSelectedUser: Dispatch<SetStateAction<SelectedUser>>
	newUser: ICreateUserRequest
	setNewUser: Dispatch<SetStateAction<ICreateUserRequest>>
	newUserInitState: {
		username: string
		role: keyof typeof Roles
		password: string
		device_id: string
	}
}

export function UserCreationForm({
	selectedUser,
	setSelectedUser,
	setNewUser,
	newUser,
	newUserInitState,
}: UserCreationFormProps) {
	const [validData, setValidData] = useState({ username: true, password: true })

	const { mutateAsync: createUser, isError, error } = useCreateUser()
	const {
		mutateAsync: updateUser,
		isError: isUpdateError,
		error: updateError,
	} = useUpdateUser()

	useEffect(() => {
		if (isError) toast(error?.message, { type: 'error', theme: 'dark' })
		if (isUpdateError) toast(updateError?.message, { type: 'error', theme: 'dark' })
	}, [isUpdateError, isError, error?.message, updateError?.message])

	return (
		<div className={styles.modal}>
			{selectedUser ? (
				<>
					<h3 className={styles.name}>Редактирование пользователя</h3>
					<div className={styles.div}>
						<p>Логин</p>
						<input
							type='text'
							value={selectedUser.username}
							className={`${styles.input} ${
								!validData.username ? styles.error : ''
							}`}
							maxLength={30}
							title={
								'Логин должен содержать 4-30 латинских символов. ' +
								'Можно использовать числа'
							}
							onChange={e => {
								setValidData(prev => ({
									...prev,
									username: new RegExp(/^[a-zA-Z0-9]{4,30}$/).test(
										e.target.value
									),
								}))
								setSelectedUser(prev => ({
									...prev,
									username: e.target.value,
								}))
							}}
						/>
					</div>
					<div className={styles.div}>
						<p>Пароль</p>
						<input
							value={selectedUser.password}
							type='password'
							className={`${styles.input} ${
								!validData.password ? styles.error : ''
							}`}
							maxLength={120}
							title={
								'Пароль должен содержать 8-120 латинских символов, включать символы ' +
								'!@#$%^&*, иметь Хотя бы одну заглавную букву'
							}
							onChange={e => {
								setValidData(prev => ({
									...prev,
									password: new RegExp(
										/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,120}/g
									).test(e.target.value),
								}))
								setSelectedUser(prev => ({
									...prev,
									password: e.target.value,
								}))
							}}
						/>
					</div>
					<div className={styles.buttons}>
						<button
							disabled={
								!selectedUser ||
								!validData.username ||
								!validData.password ||
								selectedUser.username === ''
							}
							onClick={async () => {
								await updateUser(selectedUser)
								setSelectedUser(null)
							}}>
							Сохранить
						</button>
						<button onClick={() => setSelectedUser(null)}>Отменить</button>
					</div>
				</>
			) : (
				<>
					<div className={styles.name}>
						<h3>Создание пользователя</h3>
					</div>
					<div className={styles.div}>
						<p>Логин</p>
						<input
							type='text'
							value={newUser?.username || ''}
							className={`${styles.input} ${
								!validData.username ? styles.error : ''
							}`}
							maxLength={30}
							title={
								'Логин должен содержать 4-30 латинских символов. ' +
								'Можно использовать числа'
							}
							onChange={e => {
								setValidData(prev => ({
									...prev,
									username: new RegExp(/^[a-zA-Z0-9]{4,30}$/).test(
										e.target.value
									),
								}))
								setNewUser(prev => ({
									...prev,
									username: e.target.value,
								}))
							}}
						/>
					</div>
					<div className={styles.div}>
						<p>Пароль</p>
						<input
							type='password'
							value={newUser?.password || ''}
							className={`${styles.input} ${
								!validData.password ? styles.error : ''
							}`}
							maxLength={120}
							title={
								'Пароль должен содержать 8-120 латинских символов, включать символы ' +
								'!@#$%^&*, иметь Хотя бы одну заглавную букву'
							}
							onChange={e => {
								setValidData(prev => ({
									...prev,
									password: new RegExp(
										/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,120}/g
									).test(e.target.value),
								}))
								setNewUser(prev => ({
									...prev,
									password: e.target.value,
								}))
							}}
						/>
					</div>
					<div className={styles.div}>
						<p>Какая роль?</p>
						<select
							name='unitsselect'
							id='unitsselectnew'
							value={newUser?.role}
							className={styles.input}
							onChange={e =>
								setNewUser(prev => ({
									...prev,
									role: e.target.value as Roles, // ? Roles.ADMIN : Roles.DEFAULT,
								}))
							}>
							{Object.values(Roles).map(unit => (
								<option value={unit}>{unit}</option>
							))}
						</select>
					</div>
					<div className={styles.buttons}>
						<button
							disabled={
								!newUser ||
								!validData.username ||
								!validData.password ||
								newUser.username === '' ||
								newUser.password === ''
							}
							onClick={async () => createUser(newUser)}>
							Сохранить
						</button>
						<button
							disabled={!newUser}
							onClick={() => {
								setNewUser(newUserInitState)
							}}>
							Отменить
						</button>
					</div>
				</>
			)}
			<ToastContainer />
		</div>
	)
}
