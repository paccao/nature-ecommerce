import express, { Express } from 'express'
import routes from './routes/products'

import { config } from 'dotenv'
import 'dotenv/config'
config()

const app: Express = express()

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

const PORT: any = process.env.PORT ?? 8080
app.listen(PORT, () => console.log(`The server is running on port ${PORT}.`))
