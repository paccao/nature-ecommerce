import { Request, Response } from 'express'
import checkIfStockAvailable from '../helpers/checkIfStockAvailable'
import { dbConnection as conn } from '../server'

const pushToCart = async (req: Request, res: Response) => {
	const amountToAdd: number = req.body.amount
	const productToAdd: string = req.body.productId
	const userId: string = req.body.currentUserId

	const result = await checkIfStockAvailable(amountToAdd, productToAdd)
	if (result.success === false)
		return res.status(result.status).json({
			success: result.success,
			message: result.message,
			stockAvailable: result.stockAvailable,
			error: result.error,
		})

	const pushToCartQuery = `
	INSERT INTO cart(user_id, product_id)
	VALUES ($1, $2) RETURNING *;`

	let cartRows
	try {
		const { rows } = await conn.query(pushToCartQuery, [userId, productToAdd])
		cartRows = rows
	} catch (error) {
		return res.status(400).json({
			success: false,
			message:
				'The server could not understand the request due to invalid syntax.',
			error,
		})
	}

	const changeStockAvailableQuery = `
	UPDATE products SET stock_available = $1 WHERE id = $2;
	`

	let updatedStockAvailable = result.stockAvailable - amountToAdd
	if (updatedStockAvailable < 1) updatedStockAvailable = 0

	try {
		const updateStockResult = await conn.query(changeStockAvailableQuery, [
			updatedStockAvailable,
			productToAdd,
		])

		return res
			.status(200)
			.json({ success: true, updated: { cartRows, updateStockResult } })
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: 'Failed to update amount in stock.',
			error,
		})
	}
}

export default { pushToCart }
