export type Product = {
	id: string
	name: string
	price: number
	description: string
	stock_available: number
	img_url: string
}

export type ProductWithCartAmount = {
	id: string
	name: string
	price: number
	description: string
	stock_available: number
	img_url: string
	amount: number
}

export type User = {
	id: string
	name: string
	adress: string
	username: string
	password: string
	role: RoleTypes
}

export type ProductResult = {
	success: boolean
	result: Product[]
}

export type ProductToAdd = {
	amount: number
	productId: string
	currentUserId: string
}

export type RoleTypes = 'user' | 'admin'
