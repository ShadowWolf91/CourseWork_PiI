import './App.css'
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom'
import useVirtualStore from './store'
import { Roles } from './api/enums.ts'
//import { useLogout } from './query/auth/useLogout.ts'

function App() {
	const { role, checkStorageHealth, id_user } = useVirtualStore()
	const navigate = useNavigate()

	//const { logout } = useLogout()

	if (!checkStorageHealth()) return <Navigate to={'/auth'} />
	return (
		<>
			<p
				onClick={async () => {
					if (!id_user) return
					//await logout({ id_user: +id_user })
					localStorage.clear()
					navigate('/auth') //TODO: fix logout
				}}>
				Logout
			</p>
			{role === Roles.DEFAULT ? (
				<div>
					<Link to='/user/recipes'>Рецепты </Link>
					<Link to='/user/store'>Хранилище</Link>
					<Link to='/user/checklists'>Чек-листы</Link>
				</div>
			) : (
				<div>
					<Link to='/admin/users'>Users </Link>
					<Link to='/admin/products'>Products </Link>
					<Link to='/admin/recipes'>Recipes</Link>
				</div>
			)}
			<Outlet />
		</>
	)
}

export default App
