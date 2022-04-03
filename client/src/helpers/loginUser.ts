import { LoginCredentials } from '../models/Account'

type loginResult = {
	success: boolean
}

const loginUser = async (credentials: LoginCredentials): Promise<loginResult> =>
	await (
		await fetch('http://localhost:8080/api/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		})
	).json()

export default loginUser
