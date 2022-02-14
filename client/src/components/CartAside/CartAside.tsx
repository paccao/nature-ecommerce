import React from 'react'

type Props = {}

function CartAside({}: Props) {
	return (
		<aside>
			<section>
				<h2>Cart</h2>
				<ul></ul>
				<div data-testid="order-info">
					<p>Total cost: </p>
				</div>
			</section>
		</aside>
	)
}

export default CartAside
