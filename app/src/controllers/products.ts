import { query, Request, Response } from 'express'
import User from '../models/User'
import { dbConnection as conn } from '../server'

const getProducts = async (req: Request, res: Response) => {
	const queryString = 'SELECT * FROM products;'

	try {
		const { rows } = await conn.query(queryString)
		return res.status(200).json({ success: true, result: rows })
	} catch (error) {
		console.log('getProducts error: ', error)
		return res.status(400).json({ success: false })
	}
}

const getSpecificProduct = async (req: Request, res: Response) => {
	const id = req.params.id
	if (!id)
		return res.status(400).json({
			success: false,
			message: "The id didn't come in the proper format.",
		})

	// const result = query database
	// const product: Product = result.data
	return res.status(200).json({
		success: true,
		// message: product,
	})
}

const createUser = async (req: Request, res: Response) => {
	const userToCreate: User = req.body
}

export default { getProducts, getSpecificProduct, createUser }
