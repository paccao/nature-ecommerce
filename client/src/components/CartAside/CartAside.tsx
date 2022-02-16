import React from 'react'
import useCart from '../../hooks/useCart'
import CartItem from './CartItem'

function CartAside() {
	const { data } = useCart()
	return (
		<aside>
			<section>
				<h2>Cart</h2>
				<ul>
					{data?.result?.map((cartProduct) => (
						<CartItem cartProduct={cartProduct} />
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
