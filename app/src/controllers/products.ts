import { query, Request, Response } from 'express'
import { Product, User } from '../../../client/src/models/Product'
import { isProduct } from '../helpers/productsHelpers'
import { nanoid } from 'nanoid'
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
		return res
			.status(400)
			.json({
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

const createProduct = async (req: Request, res: Response) => {
	const _request = req.body
	if (!isProduct(_request)) return // ! Bad request
	const product = { id: nanoid(), ..._request }
	const query = ``
	try {
		const { rows } = await conn.query(query)

		return res.status(201).json({ success: true, inserted: rows[0] })
	} catch (error) {
		console.log(error)
	}
}

const createUser = async (req: Request, res: Response) => {
	const userToCreate: User = req.body
}

export default { getProducts, getSpecificProduct, createProduct, createUser }
