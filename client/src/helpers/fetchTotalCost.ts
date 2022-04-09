import { CostResult } from '../models/Cart'
import apiDomain from './apiDomain'

const fetchCart = async (): Promise<CostResult> =>
	await (await fetch(`${apiDomain()}/api/cart/totalCost`)).json()

export default fetchCart
