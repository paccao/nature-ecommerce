import { GeneralCartResult } from '../models/Cart'
import apiDomain from './apiDomain'

const removeFromCart = async ({
	productIdToRemove,
	userId,
}: {
	productIdToRemove: string
	userId: string
}): Promise<GeneralCartResult> =>
	await (
		await fetch(`${apiDomain()}/api/cart/remove`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productIdToRemove, userId }),
		})
	).json()

export default removeFromCart
