import { ProductResult } from '../models/Product'
import apiDomain from './apiDomain'

export const fetchProducts = async (): Promise<ProductResult> =>
	await (await fetch(`${apiDomain()}/api/products`)).json()

export const fetchSpecificProduct = async (
	id: string,
): Promise<ProductResult> =>
	await (await fetch(`${apiDomain()}/api/products/${id}`)).json()
