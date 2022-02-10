import { Product } from '../models/Product'

export const fetchProducts = async (): Promise<Product[]> =>
	await (await fetch('http://localhost:8080/api/products')).json()

export const fetchSpecificProduct = async (id: string): Promise<Product> =>
	await (await fetch(`http://localhost:8080/api/products/${id}`)).json()
