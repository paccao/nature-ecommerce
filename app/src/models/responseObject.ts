import { Product } from '../../../client/src/models/Product'

type responseObject = {
	success: boolean
	result?: Product[]
	message?: string
	error?: any
}

export default responseObject
