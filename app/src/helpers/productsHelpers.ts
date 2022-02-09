import { Product } from '../../../client/src/models/Product'

export function isProduct(object: unknown): object is Product {
	return (
		!Object.prototype.hasOwnProperty.call(object, 'id') &&
		Object.prototype.hasOwnProperty.call(object, 'name') &&
		Object.prototype.hasOwnProperty.call(object, 'price') &&
		Object.prototype.hasOwnProperty.call(object, 'description')
	)
}
// function isProduct(object: any) {
// 	if (
// 		object.name === typeof 'string' &&
// 		object.price === typeof 123 &&
// 		object.description === typeof 'string'
// 	) {
// 		return true
// 	} else {
// 		return false
// 	}
// }
// const TESTobj = {
// 	name: 'joel',
// 	price: 123,
// 	description: 'test',
// }
// console.log(isProduct(TESTobj))
