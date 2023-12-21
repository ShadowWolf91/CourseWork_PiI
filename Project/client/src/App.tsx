import './App.css'
import { Navigate, Outlet } from 'react-router-dom'
import useVirtualStore from './store'
import { NavBar } from './components/navigation/navigation.tsx'

function App() {
	const { checkStorageHealth } = useVirtualStore()

	if (!checkStorageHealth()) return <Navigate to={'/auth'} />
	return (
		<>
			<NavBar />
			<Outlet />
		</>
	)
}

export default App
