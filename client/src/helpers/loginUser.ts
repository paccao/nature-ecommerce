import { LoginCredentials } from '../models/Account'

const loginUser = async (credentials: LoginCredentials): Promise<void> =>
	await (
		await fetch('http://localhost:8080/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		})
	).json()

export default loginUser
