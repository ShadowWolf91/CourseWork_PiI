import { useEffect, useState } from 'react'
import styles from './authPage.module.scss'
import useVirtualStore from '../../store'
import { useAuth } from '../../query/auth/useAuth.ts'
import { useRegistration } from '../../query/auth/useRegistration.ts'
import { useNavigate } from 'react-router-dom'
import { Roles } from '../../api/enums.ts'

export const AuthPage = () => {
	const [isRegistration, setIsRegistration] = useState(false)
	const [username, setLogin] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate()

	const {
		data: loggedUserData,
		loginUser,
		isLoginSuccess,
		isLoginError,
		//error: authError,
	} = useAuth()
	const { data, registerUser, error, isSuccessRegistration, isRegistrationError } =
		useRegistration()
	const { setCredentials } = useVirtualStore()
	if (error) console.log(error)

	useEffect(() => {
		if (isSuccessRegistration && isRegistration && data) {
			//localStorage.setItem('token', data.accessToken)
			//localStorage.setItem('deviceId', data.deviceId)
			localStorage.setItem('id_user', data.id_user.toString())
			localStorage.setItem('role', data.role)
			localStorage.setItem('username', username)
			setCredentials({
				username,
				role: data?.role,
				//deviceId: data.deviceId,
				id_user: data.id_user.toString(),
			})
			navigate('/user/store')
		} else if (isLoginSuccess && !isRegistration && loggedUserData) {
			//localStorage.setItem('refreshToken', loggedUserData.refreshToken)
			//localStorage.setItem('deviceId', loggedUserData.deviceId)
			localStorage.setItem('id_user', loggedUserData.id_user.toString())
			localStorage.setItem('role', loggedUserData.role)
			localStorage.setItem('username', username)
			setCredentials({
				username,
				//deviceId: loggedUserData.deviceId,
				id_user: loggedUserData.id_user.toString(),
				role: loggedUserData.role,
			})
			navigate(loggedUserData.role === Roles.DEFAULT ? '/user/store' : '/admin/users/')
		}
	}, [
		navigate,
		data,
		isLoginSuccess,
		isRegistration,
		isSuccessRegistration,
		loggedUserData,
		username,
		setCredentials,
	])

	return (
		<div
			style={{
				width: '100%',
			}}>
			<div className={styles.authorizationWindow}>
				<p className={styles.regText}>
					{isRegistration ? 'Регистрация' : 'Авторизация'}
				</p>
				<div className={styles.inputsContainer}>
					<input
						type='text'
						placeholder={'Введите логин'}
						maxLength={30}
						value={username}
						onChange={e => setLogin(e.target.value)}
						className={styles.input}
					/>
					<br />
					<input
						type='password'
						placeholder={'Введите пароль'}
						maxLength={120}
						value={password}
						onChange={e => setPassword(e.target.value)}
						className={styles.input}
					/>
				</div>
				<br />
				<br />
				<button
					type={'button'}
					className={styles.button}
					onClick={async () => {
						isRegistration
							? await registerUser({ username, password })
							: await loginUser({ username, password })
					}}>
					Отправить
				</button>
				<br />
				<div>
					{isRegistration ? (
						<p>
							Уже есть аккаунт? Попробуйте{' '}
							<mark
								className={styles.authorizationMark}
								onClick={() => setIsRegistration(false)}>
								войти
							</mark>
						</p>
					) : (
						<p>
							Нет аккаунта?{' '}
							<mark
								className={styles.authorizationMark}
								onClick={() => setIsRegistration(true)}>
								Зарегистрируйтесь!
							</mark>
						</p>
					)}
				</div>
				{(isRegistrationError || isLoginError) && (
					<p style={{ color: 'red', marginTop: '5px' }}>
						{/* {authError?.response.data.message || error?.response.data.message} */}
					</p>
				)}
			</div>
		</div>
	)
}
