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
