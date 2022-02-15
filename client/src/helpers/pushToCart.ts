import { CartResult } from '../models/Cart'
import { ProductToAdd } from '../models/Product'

export const pushToCart = async (
	productToAdd: ProductToAdd,
): Promise<CartResult> =>
	await (
		await fetch('http://localhost:8080/api/cart', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productToAdd),
		})
	).json()
