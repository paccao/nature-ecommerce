import { Product } from './Product'
import { resultObject } from '../../../app/src/models/responseObject'

export type CartResult = {
	success: boolean
	resultObj: resultObject
}

export type RemoveFromCartResult = {
	success: boolean
	message?: string
}
