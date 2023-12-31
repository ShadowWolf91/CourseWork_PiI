/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import styles from './authPage.module.scss'
import useVirtualStore from '../../store'
import { useAuth } from '../../query/auth/useAuth.ts'
import { useRegistration } from '../../query/auth/useRegistration.ts'
import { useNavigate } from 'react-router-dom'
import { Roles } from '../../api/enums.ts'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthInput } from '../../components/authInput/AuthInput.tsx'

export const AuthPage = () => {
	const navigate = useNavigate()

	const { setCredentials } = useVirtualStore()

	const [isRegistration, setIsRegistration] = useState(false)
	const [userCreds, setUserCreds] = useState({
		login: { value: '', isValid: true },
		password: { value: '', isValid: true },
	})

	const {
		data: loggedUserData,
		loginUser,
		isLoginSuccess,
		isLoginError,
		error: authError,
	} = useAuth()

	const {
		data,
		registerUser,
		error: registrationError,
		isSuccessRegistration,
		isRegistrationError,
	} = useRegistration()

	useEffect(() => {
		if (isLoginError || isRegistrationError)
			toast.error(authError?.message || registrationError?.message, {
				autoClose: 5000,
				theme: 'dark',
			})
	}, [authError?.message, isLoginError, isRegistrationError, registrationError?.message])

	useEffect(() => {
		if (isSuccessRegistration || isLoginSuccess) {
			const receivedData = data || loggedUserData
			if (!receivedData) return
			localStorage.setItem('accessToken', receivedData.accessToken)
			localStorage.setItem('device_id', receivedData.device_id)
			localStorage.setItem('id_user', receivedData.user_id.toString())
			localStorage.setItem('role', receivedData.role)
			localStorage.setItem('username', receivedData.username)
			localStorage.setItem('statisticId', Number(1).toString())
			setCredentials({
				username: receivedData.username,
				role: receivedData?.role,
				device_id: receivedData.device_id,
				id_user: receivedData.user_id.toString(),
				statisticId: Number(1).toString(),
			})

			navigate(
				receivedData.role === Roles.ADMIN
					? '/admin/users/'
					: receivedData.role === Roles.TEACHER
						? '/teacher/themes/'
						: receivedData.role === Roles.STUDENT
							? '/user/subjects'
							: '/auth'
			)
		}
	}, [data, isLoginSuccess, isSuccessRegistration, loggedUserData])

	return (
		<>
			<div
				style={{
					width: '100%',
				}}>
				<div className={styles.authorizationWindow}>
					<p className={styles.regText}>
						{isRegistration ? 'Регистрация' : 'Авторизация'}
					</p>
					<div className={styles.inputsContainer}>
						<AuthInput
							id={'username'}
							type='text'
							placeholder={'Введите логин'}
							maxLength={30}
							value={userCreds.login.value}
							onChange={e => {
								setUserCreds(prev => ({
									...prev,
									login: {
										value: e.target.value,
										isValid: new RegExp(/^[a-zA-Z0-9]{4,30}$/).test(
											e.target.value
										),
									},
								}))
							}}
							className={`${styles.input} ${
								userCreds.login.isValid ? '' : styles.error
							}`}
							errorText={
								'Логин должен содержать 4-30 латинских символов. ' +
								'Можно использовать числа'
							}
							hasError={!userCreds.login.isValid}
						/>
						<br />
						<AuthInput
							id={'password'}
							type='password'
							placeholder={'Введите пароль'}
							maxLength={120}
							value={userCreds.password.value}
							onChange={e => {
								setUserCreds(prev => ({
									...prev,
									password: {
										value: e.target.value,
										isValid: new RegExp(
											/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,120}/g
										).test(e.target.value),
									},
								}))
							}}
							className={`${styles.input} ${
								userCreds.password.isValid ? undefined : styles.error
							}`}
							errorText={`Пароль должен содержать 8-120 латинских символов, включать символы !@#$%^&*, иметь Хотя бы одну заглавную букву`}
							hasError={!userCreds.password.isValid}
						/>
					</div>
					<br />
					<br />
					<button
						type={'button'}
						className={styles.button}
						disabled={
							!(userCreds.login.isValid && userCreds.password.isValid) ||
							!userCreds.login.value ||
							!userCreds.password.value
						}
						onClick={async () => {
							const action = isRegistration ? registerUser : loginUser
							await action({
								username: userCreds.login.value,
								password: userCreds.password.value,
							})
						}}>
						Отправить
					</button>
					<br />
					<div>
						{isRegistration ? (
							<p>
								Уже есть аккаунт? Попробуйте{' '}
								<a
									className={styles.authorizationMark}
									onClick={() => setIsRegistration(false)}>
									войти
								</a>
							</p>
						) : (
							<p>
								Нет аккаунта?{' '}
								<a
									className={styles.authorizationMark}
									onClick={() => setIsRegistration(true)}>
									Зарегистрируйтесь!
								</a>
							</p>
						)}
					</div>
				</div>
			</div>
			<ToastContainer />
		</>
	)
}
