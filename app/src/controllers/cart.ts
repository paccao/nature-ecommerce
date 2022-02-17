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
			error,
		}
		return res.status(500).json(result)
	}

	const getProductsInCartQuery = `
	SELECT * FROM products WHERE id = ANY($1::uuid[]);`

	const listOfProductIds = currentCart.map((entry) => entry.product_id)
	console.log('CURRENT CART :', currentCart)

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
			error,
		}
		return res.status(500).json(result)
	}
}

export default { pushToCart, getCart }
