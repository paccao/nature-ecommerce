import express, { Express } from 'express'
import bodyParser from 'body-parser'
import 'dotenv/config'

import productRoutes from './routes/products'
import cartRoutes from './routes/cartRoutes'
import accountRoutes from './routes/accountRoutes'
import authRoutes from './routes/authRoutes'

import { corsMiddleware } from './middleware/corsMiddleware'
import pool from './connection'
export const dbConnection = pool()

const app: Express = express()
const PORT: any = process.env.PORT ?? 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(corsMiddleware)
app.use(express.json())
app.use(express.static('public'))
app.use('/', productRoutes)
app.use('/', cartRoutes)
app.use('/', accountRoutes)
app.use('/', authRoutes)

// Error handling
app.use((req, res) => {
	const error = new Error('not found')
	return res.status(404).json({
		message: error.message,
	})
})

app.listen(PORT, () => console.log(`The server is running on port ${PORT}.`))
