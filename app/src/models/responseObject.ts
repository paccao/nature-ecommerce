import { Product, ProductWithCartAmount } from './Product'

type CurrentCart = {
	product_id: string
	amount: number
}

export type resultObject = {
	productArr: Product[]
	currentCart: CurrentCart[]
}

type responseObject = {
	success: boolean
	result?: Product[]
	resultObj?: resultObject
	message?: string
	productsToMap?: ProductWithCartAmount[]
}

export default responseObject
