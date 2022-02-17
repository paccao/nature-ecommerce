import React from 'react'
import useCart from '../../hooks/useCart'
import CartItem from './CartItem'

function CartAside() {
	const { data } = useCart()
	console.log(data)
	return (
		<aside>
			<section>
				<h2>Cart</h2>
				<ul>
					{data?.result?.map((cartProduct) => (
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
