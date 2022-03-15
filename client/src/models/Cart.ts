import { ProductWithCartAmount } from './Product'

export type CartResult = {
	success: boolean
	productsToMap: ProductWithCartAmount[]
}

export type GeneralCartResult = {
	success: boolean
	message?: string
}

export type CostResult = {
	success: boolean
	totalCost: number
}
