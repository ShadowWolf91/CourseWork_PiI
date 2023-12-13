import 'dotenv/config'

export const CONFIG = {
	PORT: process.env.PORT || 3000,
	JWT_REFRESH: process.env.JWT_REFRESH || 'ReFrEsH',
	CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3001',
}