import { Roles } from '../../api/enums.ts'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useVirtualStore from '../../store'
import { useLogout } from '../../query/auth/useLogout.ts'
import styles from './navigation.module.scss'

export function NavBar() {
	const { role, id_user, device_id } = useVirtualStore()
	const navigate = useNavigate()

	const { logout } = useLogout()
	return (
		<div className={styles.navBarContainer}>
			{role === Roles.ADMIN ? (
				<div className={styles.linksContainer}>
					<Link to='/admin/users'>Пользователи</Link>
					<Link to='/admin/subjects'>Предметы</Link>
				</div>
			) : role === Roles.TEACHER ? (
				<div className={styles.linksContainer}>
					<Link to='/teacher/tests'>Тесты </Link>
					<Link to='/teacher/openQuestions'>Открытые вопросы</Link>
					<Link to='/teacher/cards'>Карточки</Link>
					<Link to='/teacher/themes'>Темы</Link>
					<Link to='/teacher/stats'>Статистики</Link>
				</div>
			) : role === Roles.DEFAULT ? (
				<div>
					{/* <Link to='/user/recipes'>Рецепты </Link>
					<Link to='/user/store'>Хранилище</Link> */}
					<Link to='/user/subjects'>Предметы</Link>
				</div>
			) : (
				<Navigate to={'/auth'} />
			)}
			<button
				className={styles.logout}
				onClick={async () => {
					if (!id_user || !device_id) return
					await logout({ user_id: +id_user, devices_id: [device_id] })
					localStorage.clear()
					navigate('/auth')
				}}>
				Logout
			</button>
		</div>
	)
}
