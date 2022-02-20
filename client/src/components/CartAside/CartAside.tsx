import styled from 'styled-components'
import useCart from '../../hooks/useCart'
import { ProductWithCartAmount } from '../../models/Product'
import CartItem from './CartItem'
import currentTotalCost from '../../helpers/currentTotalCost'

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
		<AsideWrapper>
			<section>
				<h2>Cart</h2>
				<ul>
					{productsToMap.map((cartProduct) => (
						<CartItem key={cartProduct.id} cartProduct={cartProduct} />
					))}
				</ul>
				<div>
					<p data-testid="cart-total-cost">
						Total cost: {currentTotalCost(productsToMap)}kr.
					</p>
				</div>
			</section>
		</AsideWrapper>
	)
}

export default CartAside

const AsideWrapper = styled.aside`
	background-color: #fff;
	min-height: 87vh;
	border-radius: ${(props) => props.theme.borderRadius};
	border-bottom-right-radius: ${(props) => props.theme.borderRadius};
	border-top-right-radius: ${(props) => props.theme.borderRadius};
	border: 2px solid #dcd3d3;
	padding: 0.2rem 0.3rem 0.3rem 0.8rem;
	margin-right: 1rem;
`
