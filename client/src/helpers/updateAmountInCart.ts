import { GeneralCartResult } from '../models/Cart'
import apiDomain from './apiDomain'

const updateAmountInCart = async ({
	productIdToUpdate,
	userId,
	newAmount,
}: {
	productIdToUpdate: string
	userId: string
	newAmount: number
}): Promise<GeneralCartResult> =>
	await (
		await fetch(`${apiDomain()}/api/cart/updateAmount`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productIdToUpdate, userId, newAmount }),
		})
	).json()

export default updateAmountInCart
