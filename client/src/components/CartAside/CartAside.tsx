import useCart from '../../hooks/useCart'
import { ProductWithCartAmount } from '../../models/Product'
import CartItem from './CartItem'

function CartAside() {
	const { data, isSuccess } = useCart()
	console.log(data)
	let productsToMap: ProductWithCartAmount[] = []

	if (isSuccess) {
		getProductsToMap()
	}
	function getProductsToMap() {
		const currentCart = data?.resultObj?.currentCart
		const productArr = data?.resultObj?.productArr
		if (!currentCart || !productArr) return null

		let currentIndexValueCart: { product_id: string; amount: number }
		for (let i = 0; i < currentCart?.length; i++) {
			currentIndexValueCart = currentCart[i]

			const productFound: any = productArr.find(
				(product) => product.id === currentIndexValueCart?.product_id,
			)

			if (!productFound) return null
			productsToMap = [
				{ ...productFound, amount: currentIndexValueCart.amount },
			]
		}
	}

	return (
		<aside>
			<section>
				<h2>Cart</h2>
				<ul>
					{productsToMap.map((cartProduct) => (
						<CartItem key={cartProduct.id} cartProduct={cartProduct} />
					))}
				</ul>
				<div data-testid="order-info">
					<p>Total cost: </p>
				</div>
			</section>
		</aside>
	)
}

export default CartAside
