import { Product, ProductWithCartAmount } from './Product'

type CurrentCart = {
	product_id: string
	amount: number
}

export type resultObject = {
	productArr: Product[]
	currentCart: CurrentCart[]
}

export type CostResult = {
	success: boolean
	totalCost: number
}

type responseObject = {
	success: boolean
	result?: Product[]
	resultObj?: resultObject
	message?: string
	productsToMap?: ProductWithCartAmount[]
}

export default responseObject
