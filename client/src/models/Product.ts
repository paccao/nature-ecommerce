export type Product = {
	id: string
	name: string
	price: number
	description: string
	stock_available: number
	img_url: string
}

export type User = {
	id: string
	name: string
	adress: string
	username: string
	password: string
	role: RoleTypes
}

export type RoleTypes = 'user' | 'admin'