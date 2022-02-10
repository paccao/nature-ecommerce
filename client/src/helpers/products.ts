import { Product } from '../models/Product'

export const getProducts = async (): Promise<Product> =>
	await (await fetch('http://localhost:8080/api/products')).json()
