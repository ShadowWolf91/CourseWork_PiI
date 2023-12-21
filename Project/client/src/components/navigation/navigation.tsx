import { Roles } from '../../api/enums.ts'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import useVirtualStore from '../../store'
//import { useLogout } from '../../query/auth/useLogout.ts'
import styles from './navigation.module.scss'

export function NavBar() {
	const { role, id_user } = useVirtualStore()
	const navigate = useNavigate()

	//const { logout } = useLogout()
	return (
		<div className={styles.navBarContainer}>
			<div className={`${styles.cube}`}></div>
			{role === Roles.ADMIN ? (
				<div className={styles.linksContainer}>
					<Link to='/admin/users'>Пользователи</Link>
					<Link to='/admin/products'>Продукты</Link>
					<Link to='/admin/recipes'>Рецепты</Link>
				</div>
			) : role === Roles.DEFAULT ? (
				<div>
					<Link to='/user/recipes'>Рецепты </Link>
					<Link to='/user/store'>Хранилище</Link>
					<Link to='/user/checklists'>Чек-листы</Link>
				</div>
			) : (
				<Navigate to={'/auth'} />
			)}
			<button
				className={styles.logout}
				onClick={async () => {
					if (!id_user) return
					//await logout({ id_user: +id_user })
					localStorage.clear()
					navigate('/auth')
				}}>
				Logout
			</button>
			<div className={`${styles.cube}`}></div>
		</div>
	)
}
