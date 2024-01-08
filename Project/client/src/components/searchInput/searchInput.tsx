import { ChangeEventHandler, ReactNode } from 'react'
import styles from './searchInput.module.scss'

interface SearchInputProps {
	search: string
	onChange: ChangeEventHandler<HTMLInputElement> | undefined
	children?: ReactNode
}

export function SearchInput({ search, onChange, children }: SearchInputProps) {
	return (
		<div className={styles.container}>
			<form className={styles.form}>
				{/* <p className={styles.text}>Поиск</p> */}
				<input
					placeholder='Поиск'
					className={styles.input}
					type='text'
					value={search}
					onChange={onChange}
				/>
				<button type='submit' className={styles.buttonSearch}>
					Find
				</button>
			</form>
			<div>{children}</div>
		</div>
	)
}
