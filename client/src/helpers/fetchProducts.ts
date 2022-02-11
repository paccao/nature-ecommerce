import { ProductResult } from '../models/Product'

export const fetchProducts = async (): Promise<ProductResult> =>
	await (await fetch('http://localhost:8080/api/products')).json()

export const fetchSpecificProduct = async (
	id: string,
): Promise<ProductResult> =>
	await (await fetch(`http://localhost:8080/api/products/${id}`)).json()
