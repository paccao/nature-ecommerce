import { GeneralCartResult } from '../models/Cart'

const updateAmountInCart = async ({
	cartIdToUpdate,
	userId,
}: {
	cartIdToUpdate: string
	userId: string
}): Promise<GeneralCartResult> =>
	await (
		await fetch('http://localhost:8080/api/cart/updateAmount', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ cartIdToUpdate, userId }),
		})
	).json()

export default updateAmountInCart
