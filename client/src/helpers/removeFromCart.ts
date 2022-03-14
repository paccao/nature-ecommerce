import { GeneralCartResult } from '../models/Cart'

const removeFromCart = async ({
	productIdToRemove,
	userId,
}: {
	productIdToRemove: string
	userId: string
}): Promise<GeneralCartResult> =>
	await (
		await fetch('http://localhost:8080/api/cart/remove', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productIdToRemove, userId }),
		})
	).json()

export default removeFromCart
