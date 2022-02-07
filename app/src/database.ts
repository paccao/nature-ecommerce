import { Pool } from 'pg'
import 'dotenv/config'

export default function db() {
	return new Pool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_SOURCE,
	})
}
