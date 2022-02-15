import { query, Request, Response } from 'express'
import { Product, User } from '../../../client/src/models/Product'
import { isProduct } from '../helpers/productsHelpers'
import { nanoid } from 'nanoid'
import { dbConnection as conn } from '../server'

const pushToCart = async (req: Request, res: Response) => {
	const amountToAdd = req.body.amount
	const productToAdd = req.body.productId
	const userId = req.body.currentUserId

	//TODO: Check that amountToAdd is not falsy or exceeds the amount that actually exist
	// To do this, FETCH the specific product by its productId

	const query = `INSERT INTO cart(user_id, product_id)
	VALUES ($userId, $productToAdd)
	RETURNING *;`

	const reqBody = {
		amountToAdd,
		productToAdd,
		userId,
	}

	return res.status(200).json({ success: true, reqBody })
}

export default { pushToCart }
