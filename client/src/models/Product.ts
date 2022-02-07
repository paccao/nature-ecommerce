export interface Product {
	id: string
	name: string
	price: number
	description: string
}

export interface User {
	id: string
	name: string
	adress: string
	username: string
	password: string
	role: RoleTypes
}

export type RoleTypes = 'user' | 'admin'
