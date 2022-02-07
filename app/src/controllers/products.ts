import { Request, Response, NextFunction } from 'express'
import { Product } from '../../../client/src/models/Product'

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
	const productToCreate: Product = req.body
}

export default { getProducts, getProduct }
