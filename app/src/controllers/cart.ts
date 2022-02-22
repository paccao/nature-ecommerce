import { Request, Response } from 'express'
import responseObject from '../models/responseObject'
import checkIfStockAvailable from '../helpers/checkIfStockAvailable'
import { dbConnection as conn } from '../server'
import RemoveFromCartResult from '../models/removeFromCartResult'

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
		})
	}
}

const getCart = async (req: Request, res: Response) => {
	// TODO: Replace temp user with JWT
	const temporaryUserId = '0e265459-81fd-4e26-ab88-6830452fdae6'
	const getCartQuery = `
	SELECT product_id, amount FROM cart WHERE user_id = $1;
	`

	let currentCart
	try {
		const { rows } = await conn.query(getCartQuery, [temporaryUserId])
		currentCart = rows
		// const result: responseObject = { success: true, result: rows }
	} catch (error) {
		const result: responseObject = {
			success: false,
			message: 'Something went wrong while fetching the cart data.',
		}
		return res.status(500).json(result)
	}

	const getProductsInCartQuery = `
	SELECT * FROM products WHERE id = ANY($1::uuid[]);`

	const listOfProductIds = currentCart.map((entry) => entry.product_id)

	try {
		const { rows } = await conn.query(getProductsInCartQuery, [
			listOfProductIds,
		])
		const result: responseObject = {
			success: true,
			resultObj: {
				productArr: rows,
				currentCart,
			},
		}
		res.status(200).json(result)
	} catch (error) {
		const result: responseObject = {
			success: false,
			message:
				'Something went wrong while fetching the product data in cart.',
		}
		return res.status(500).json(result)
	}
}

const removeFromCart = async (req: Request, res: Response) => {
	const userId = req.body.userId
	const productIdToRemove = req.body.productIdToRemove
	let result: RemoveFromCartResult = { success: false }

	if (!userId || !productIdToRemove) {
		return res.status(400).json({
			...result,
			message:
				'The information in the request was not in the proper format.',
		})
	}

	// Get the cart ROW where the request id's fits
	const getCartQuery = `
	SELECT product_id, amount FROM cart WHERE user_id = $1 AND product_id = $2;
	`
	let cartQueryResult: { product_id: string; amount: number }
	try {
		const { rows } = await conn.query(getCartQuery, [userId, '123'])

		cartQueryResult = rows[0]
	} catch (error) {
		result = {
			success: false,
			message:
				'The server failed to handle the request. Try passing other data',
		}

		return res.status(500).json(result)
	}

	// Remove that row
	// Update stock available in shop

	res.status(200).json({ success: true })
}

export default { pushToCart, getCart, removeFromCart }
