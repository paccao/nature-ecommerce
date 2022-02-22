import { Product } from '../../../client/src/models/Product'

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
}

export default responseObject
