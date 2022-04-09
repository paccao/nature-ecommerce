import { CartResult } from '../models/Cart'
import apiDomain from './apiDomain'

export const fetchCart = async (): Promise<CartResult> =>
	await (await fetch(`${apiDomain()}/api/cart`)).json()
