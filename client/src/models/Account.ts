export type Account = {
	id: string
	name: string
	username: string
	adress: string
	role: RoleTypes
}

export type AccountResult = {
	success: boolean
	account: Account
	message?: string
}

export type RoleTypes = 'user' | 'admin'

export type LoginCredentials = {
	username: string
	password: string
}
