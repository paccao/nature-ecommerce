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

	const queryString = `INSERT INTO cart(user_id, product_id)
	VALUES ($1, $2)
	RETURNING *;`

	try {
		const { rows } = await conn.query(queryString, [userId, productToAdd])

		return res.status(201).json({ success: true, inserted: rows })
	} catch (error) {
		return res.status(400).json({
			success: false,
			message:
				'The server could not understand the request due to invalid syntax.',
			error,
		})
	}
}

export default { pushToCart }
