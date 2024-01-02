import { useEffect, useState } from 'react'
import styles from './timer.module.scss'

interface TimerProps {
	timeLimit: number
	onTimeout?: () => void
}

export default function Timer({ timeLimit = 15, onTimeout }: TimerProps) {
	const [time, setTime] = useState(new Date(timeLimit * 60 * 1000))

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(prev => {
				const diff = new Date(prev.getTime() - 1000)
				if (diff.getTime() === 0) {
					clearInterval(interval)
					onTimeout && onTimeout()
				}
				return diff
			})
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className={styles.timerContainer}>
			{time.getMinutes()}:{time.getSeconds().toLocaleString().padStart(2, '0')}
		</div>
	)
}
