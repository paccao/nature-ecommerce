import { Request, Response } from 'express'
import responseObject from '../models/responseObject'
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

	let cartRows
	let existingCartRows
	let updatedExistingCartRows

	/// Find if cart row already exist
	const findExistingProductInCartQuery = `
		SELECT id, amount FROM cart WHERE user_id = $1 AND product_id = $2;
	`

	try {
		const { rows } = await conn.query(findExistingProductInCartQuery, [
			userId,
			productToAdd,
		])
		existingCartRows = rows
	} catch (error) {
		return res.status(400).json({
			success: false,
			message:
				'The server could not understand the request due to invalid syntax.',
			error,
		})
	}

	if (existingCartRows.length > 0) {
		/// Push to existing cart

		const pushToExistingCartQuery = `
		UPDATE cart SET amount = $1 WHERE id = $2;
		`
		const updatedItemAmountInCart = existingCartRows[0].amount + amountToAdd

		try {
			const { rows } = await conn.query(pushToExistingCartQuery, [
				updatedItemAmountInCart,
				existingCartRows[0].id,
			])
			updatedExistingCartRows = rows
		} catch (error) {
			return res.status(400).json({
				success: false,
				message:
					'The server could not understand the request due to invalid syntax.',
				error,
			})
		}
	} else {
		/// Push to new cart

		const pushToNewCartQuery = `
		INSERT INTO cart(user_id, product_id)
		VALUES ($1, $2) RETURNING *;`

		try {
			const { rows } = await conn.query(pushToNewCartQuery, [
				userId,
				productToAdd,
			])
			cartRows = rows
		} catch (error) {
			return res.status(400).json({
				success: false,
				message:
					'The server could not understand the request due to invalid syntax.',
				error,
			})
		}
	}

	/// Update stock availability accordingly
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

		return res.status(200).json({
			success: true,
			updated: { cartRows, existingCartRows, updateStockResult },
		})
	} catch (error) {
		return res.status(400).json({
			success: false,
			message: 'Failed to update amount in stock.',
			error,
		})
	}
}

const getCart = (req: Request, res: Response) => {
	const resJsonObj: responseObject = { success: true, result: [] }
	res.status(200).json(resJsonObj)
}

export default { pushToCart, getCart }
