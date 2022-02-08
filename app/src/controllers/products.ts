import { Request, Response } from 'express'
import { Product, User } from '../../../client/src/models/Product'
import {isProduct} from '../helpers/productsHelpers'

const getProducts = async (req: Request, res: Response) => {
	//? query database
	// const result
	//? save queried products
	// const products: [Product] = result.data
	return res.status(200).json({
		success: true,
		// message: products,
	})
}

const getProduct = async (req: Request, res: Response) => {
	const id = req.params.id

	// const result = query database
	// const product: Product = result.data
	return res.status(200).json({
		success: true,
		// message: product,
	})
}

const createProduct = async (req: Request, res: Response) => {
	const _request = req.body
	if (!isProduct(_request)) // ! Bad request
}

const createUser = async (req: Request, res: Response) => {
	const userToCreate: User = req.body
}

export default { getProducts, getProduct, createProduct, createUser }
