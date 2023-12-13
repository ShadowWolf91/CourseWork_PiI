import cookieParser from 'cookie-parser'
import express from 'express'
import { exit } from 'node:process'
import prismaClient from './prismaClient'

const app = express()

app.use(express.json())
app.use(cookieParser())

const main = async () => {
	try {
		await prismaClient.$connect()
		app.listen(3000, () =>
			console.log(`Server started on port ${3000}`)
		)
	} catch (e) {
		console.error('Connection error. Stopping process...')
		await prismaClient.$disconnect()
		console.error(e)
	}
}

main().catch(() => console.log('Process stopped'))

process.on('SIGINT', async () => {
	await prismaClient.$disconnect()
	console.log('Disconnected with SIGINT')
	exit(0)
})