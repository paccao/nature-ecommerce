import { CostResult } from '../models/Cart'
import apiDomain from './apiDomain'

const fetchTotalCost = async (): Promise<CostResult> =>
	await (await fetch(`${apiDomain()}/api/cart/totalCost`)).json()

export default fetchTotalCost
