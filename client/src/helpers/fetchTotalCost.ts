import { CostResult } from '../models/Cart'

const fetchCart = async (): Promise<CostResult> =>
	await (await fetch('http://localhost:8080/api/cart/totalCost')).json()

export default fetchCart
