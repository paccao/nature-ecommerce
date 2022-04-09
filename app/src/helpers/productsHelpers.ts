import { Product } from '../models/Product'

export function isProduct(object: unknown): object is Product {
	return (
		!Object.prototype.hasOwnProperty.call(object, 'id') &&
		Object.prototype.hasOwnProperty.call(object, 'name') &&
		Object.prototype.hasOwnProperty.call(object, 'price') &&
		Object.prototype.hasOwnProperty.call(object, 'description')
	)
}
