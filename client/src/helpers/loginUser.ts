import { LoginCredentials } from '../models/Account'
import apiDomain from './apiDomain'

type loginResult = {
	success: boolean
	message?: string
}

const loginUser = async (credentials: LoginCredentials): Promise<loginResult> =>
	await (
		await fetch(`${apiDomain()}/api/auth/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(credentials),
		})
	).json()

export default loginUser
