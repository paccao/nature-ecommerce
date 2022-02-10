import express, { Express } from 'express'
import routes from './routes/products'
import 'dotenv/config'

import { corsMiddleware } from './helpers/corsMiddleware'
import pool from './connection'
export const dbConnection = pool()

const app: Express = express()
const PORT: any = process.env.PORT ?? 8080

app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('public'))
app.use('/', routes)

// Error handling
app.use((req, res) => {
	const error = new Error('not found')
	return res.status(404).json({
		message: error.message,
	})
})

app.listen(PORT, () => console.log(`The server is running on port ${PORT}.`))