import { create } from 'zustand'
import { Roles } from '../api/enums.ts'

const useVirtualStore = create<{
	id_user: string | null
	//deviceId: string | null
	role: keyof typeof Roles
	username: string | null
	setCredentials: (params: {
		id_user: string | null
		//deviceId: string | null
		role: keyof typeof Roles
		username: string | null
	}) => void
	checkStorageHealth: () => boolean
}>((set, get) => ({
	//deviceId: localStorage.getItem('deviceId'),
	username: localStorage.getItem('username'),
	role: localStorage.getItem('role') as Roles,
	id_user: localStorage.getItem('id_user'),
	setCredentials: params => set(() => ({ ...params })),
	checkStorageHealth: () => Object.values(get()).every(item => item),
}))

export default useVirtualStore
