import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { Product } from '../../models/Product'
import useRemoveFromCart from '../../hooks/useRemoveFromCart'
import temporaryUser from '../../helpers/temporaryUser'
import { useRecoilState } from 'recoil'
import isConfirmDeleteOpen from '../../atoms/confirmDeleteCartitemModalState'

function CartItem({ cartProduct }: { cartProduct: Product }) {
	const { mutate: removeFromCart } = useRemoveFromCart()
	const [confirmDeleteState, useConfirmDeleteState] =
		useRecoilState(isConfirmDeleteOpen)

	function removeProductFromCart(event: SyntheticEvent) {
		event.preventDefault()
		removeFromCart({
			productIdToRemove: cartProduct.id,
			userId: temporaryUser,
		})
	}

	return (
		<CartItemWrapper>
			<ImageWrapper>
				<img
					src={cartProduct.img_url}
					alt={`${cartProduct.name} product in cart.`}
				/>
			</ImageWrapper>
			<div>
				<NameWrapper>
					<h3>{cartProduct.name}</h3>
					<button onClick={removeProductFromCart}>X</button>
				</NameWrapper>
				ProductItemBottom (reuse)
			</div>
		</CartItemWrapper>
	)
}

export default CartItem

const CartItemWrapper = styled.li`
	display: grid;
	grid-template-columns: 2fr 3fr;
`

const ImageWrapper = styled.div`
	position: relative;
	max-width: 100px;
	width: 100%;
	height: auto;
	align-self: center;

	img {
		width: 100%;
		height: auto;
		object-fit: cover;
		border-radius: 5px;
	}
`

const NameWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	margin: 0rem 0.2rem;

	button {
		all: unset;
		cursor: pointer;
		border: 2px solid #dcd3d3;
		height: 15px;
		width: 15px;
		font-size: 0.8em;
		font-weight: 700;
		text-align: center;
		border-radius: 5px;
	}
`
