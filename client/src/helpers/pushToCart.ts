import { CartResult } from '../models/Cart'
import { ProductToAdd } from '../models/Product'
import apiDomain from './apiDomain'

export const pushToCart = async (
	productToAdd: ProductToAdd,
): Promise<CartResult> =>
	await (
		await fetch(`${apiDomain()}/api/cart`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(productToAdd),
		})
	).json()
