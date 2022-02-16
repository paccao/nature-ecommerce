import { CartResult } from '../models/Cart'

export const fetchCart = async (): Promise<CartResult> =>
	await (await fetch('http://localhost:8080/api/cart')).json()
