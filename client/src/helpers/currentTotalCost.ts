import { Product } from '../models/Product'

export default function currentTotalCost(currentProducts: Product[]): number {
	if (!currentProducts) return 0

	let totalSum = 0
	const priceArr = currentProducts.map((product) => product.price)
	priceArr.forEach((price) => (totalSum += price))

	return totalSum
}
