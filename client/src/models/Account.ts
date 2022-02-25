export type Account = {
	id: string
	name: string
	username: string
	adress: string
	role: RoleTypes
}

export type RoleTypes = 'user' | 'admin'
