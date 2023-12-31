import { create } from 'zustand'
import { Roles } from '../api/enums.ts'

const useVirtualStore = create<{
	id_user: string | null
	device_id: string | null
	role: keyof typeof Roles
	username: string | null
	statisticId: string | null
	setCredentials: (params: {
		id_user: string | null
		device_id: string | null
		role: keyof typeof Roles
		username: string | null
		statisticId: string | null
	}) => void
	checkStorageHealth: () => boolean
}>((set, get) => ({
	device_id: localStorage.getItem('device_id'),
	username: localStorage.getItem('username'),
	role: localStorage.getItem('role') as Roles,
	id_user: localStorage.getItem('id_user'),
	statisticId: localStorage.getItem('statisticId'),
	setCredentials: params => set(() => ({ ...params })),
	checkStorageHealth: () => true,
}))

export default useVirtualStore
