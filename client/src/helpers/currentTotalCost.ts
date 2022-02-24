import { ProductWithCartAmount } from '../models/Product'

type priceAmountObj = {
	price: number
	amount: number
}

export default function currentTotalCost(
	currentProducts: ProductWithCartAmount[],
): number {
	if (!currentProducts) return 0

	let totalSum = 0
	const priceArr = currentProducts.map((product) => {
		return { price: product.price, amount: product.amount }
	})
	priceArr.forEach((obj) => (totalSum += obj.price * obj.amount))

	return totalSum
}
