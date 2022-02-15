import { CartResult } from '../models/Cart'

export const pushToCart = async (): Promise<CartResult> =>
	await (await fetch('http://localhost:8080/api/products')).json()
