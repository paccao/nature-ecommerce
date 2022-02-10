import { Pool } from 'pg'
import 'dotenv/config'
export default function pool() {
	return new Pool({
		ssl: { rejectUnauthorized: false },
	})
}
