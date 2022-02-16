import React from 'react'
import { Cart } from '../../models/Cart'
import { Product } from '../../models/Product'

type Props = {
	cartProduct: Cart
}

function CartItem({ cartProduct }: Props) {
	return <li>CartItem</li>
}

export default CartItem
