import { Request, Response } from 'express'
import responseObject, { CostResult } from '../models/responseObject'
import checkIfStockAvailable from '../helpers/checkIfStockAvailable'
import { dbConnection as conn } from '../server'
import RemoveFromCartResult from '../models/removeFromCartResult'
import { Product, ProductWithCartAmount } from '../models/Product'

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
		INSERT INTO cart(user_id, product_id, amount)
		VALUES ($1, $2, $3) RETURNING *;`
		try {
			const { rows } = await conn.query(pushToNewCartQuery, [
				userId,
				productToAdd,
				amountToAdd,
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

		/// Format array of products found after query to database

		let productsToMap: ProductWithCartAmount[] = []
		let currentIndexValueCart: { product_id: string; amount: number }
		for (let i = 0; i < currentCart?.length; i++) {
			currentIndexValueCart = currentCart[i]

			const productFound: Product | undefined = rows.find(
				(product) => product.id === currentIndexValueCart?.product_id,
			)

			if (!productFound) return null
			productsToMap = [
				...productsToMap,
				{
					...productFound,
					amount: currentIndexValueCart.amount,
				},
			]
		}
		const result: responseObject = {
			success: true,
			productsToMap,
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

	// Get more information about the selected cart item
	const getCartQuery = `
	SELECT id, product_id, amount FROM cart WHERE user_id = $1 AND product_id = $2;
	`
	let cartQueryResult: { id: string; product_id: string; amount: number }
	try {
		const { rows } = await conn.query(getCartQuery, [
			userId,
			productIdToRemove,
		])

		// TODO: if rows.length > 1 Something is wrong in the database

		cartQueryResult = rows[0]
	} catch (error) {
		result = {
			success: false,
			message:
				'The server failed to handle the request. Try passing other data',
		}

		return res.status(500).json(result)
	}

	// Remove selected cart item
	const removeCartRowQuery = `
	DELETE FROM cart WHERE id = $1;
	`
	try {
		await conn.query(removeCartRowQuery, [cartQueryResult.id])
	} catch (error) {
		result = {
			success: false,
			message: 'The server failed to remove the selected cart item.',
		}

		return res.status(500).json(result)
	}

	// Get current stock available of the selected product
	const getCurrentAmountOfProductQuery = `
	SELECT stock_available FROM products WHERE id = $1;
	`
	let currentStockAvailable: number

	try {
		const { rows } = await conn.query(getCurrentAmountOfProductQuery, [
			cartQueryResult.product_id,
		])

		if (!rows[0].stock_available || rows[0].stock_available < 1) {
			currentStockAvailable = 0
		} else {
			currentStockAvailable = rows[0].stock_available
		}
	} catch (error) {
		result = {
			success: false,
			message: 'Failed to get internal data, try again later.',
		}
		res.status(500).json(result)
	}

	// Update stock available in shop
	const changeStockAvailableQuery = `
	UPDATE products SET stock_available = $1 WHERE id = $2;
	`

	let updatedStockAvailable = currentStockAvailable + cartQueryResult.amount
	if (!updatedStockAvailable) {
		updatedStockAvailable = currentStockAvailable
	}

	try {
		await conn.query(changeStockAvailableQuery, [
			updatedStockAvailable,
			cartQueryResult.product_id,
		])

		return res.status(201).json({
			success: true,
		})
	} catch (error) {
		// TODO: Add item back to cart
		return res.status(500).json({
			success: false,
			message: 'Failed to update amount in stock.',
		})
	}
}

const updateAmount = async (req: Request, res: Response) => {
	const productIdToUpdate: string = req.body.productIdToUpdate
	const userId: string = req.body.userId
	const newAmount: number = req.body.newAmount
	const updateAmountQuery = `
	UPDATE cart SET amount = $1 WHERE user_id = $2 AND product_id = $3;
	`

	try {
		await conn.query(updateAmountQuery, [
			newAmount,
			userId,
			productIdToUpdate,
		])
		return res.status(201).json({
			success: true,
		})
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Failed to update amount in cart.',
		})
	}
}

const getTotalCost = async (req: Request, res: Response) => {
	// TODO: Replace temp user with JWT
	const temporaryUserId = '0e265459-81fd-4e26-ab88-6830452fdae6'
	const cartInfoQuery = `
	SELECT product_id, amount FROM cart WHERE user_id = $1;
	`

	let arrOfCartInfo: [{ product_id: string; amount: number }] | any[]

	try {
		const { rows } = await conn.query(cartInfoQuery, [temporaryUserId])
		arrOfCartInfo = rows
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Failed to get sum of products in cart',
		})
	}

	const idArrToQuery = arrOfCartInfo.map((product) => product.product_id)
	const pricesOfProductsInCartQuery = `
	SELECT id, price FROM products WHERE id = ANY($1::uuid[]);
	`

	try {
		const { rows } = await conn.query(pricesOfProductsInCartQuery, [
			idArrToQuery,
		])

		let currentSum: number = 0
		arrOfCartInfo.forEach((cartInfoObj) => {
			rows.forEach((objWithIdAndPrice) => {
				if (objWithIdAndPrice.id === cartInfoObj.product_id) {
					if (!cartInfoObj.amount) {
						currentSum = currentSum + objWithIdAndPrice.price
					} else {
						currentSum =
							currentSum + objWithIdAndPrice.price * cartInfoObj.amount
					}
				}
			})
		})

		const result: CostResult = {
			success: true,
			totalCost: !currentSum ? 0 : currentSum,
		}
		res.status(200).json(result)
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'Failed to get sum of products in cart',
		})
	}
}

export default {
	pushToCart,
	getCart,
	removeFromCart,
	updateAmount,
	getTotalCost,
}
