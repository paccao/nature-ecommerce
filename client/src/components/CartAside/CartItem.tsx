import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'
import { ProductWithCartAmount } from '../../models/Product'
import useRemoveFromCart from '../../hooks/useRemoveFromCart'
import temporaryUser from '../../helpers/temporaryUser'
import { useRecoilState } from 'recoil'
import isConfirmDeleteOpen from '../../atoms/confirmDeleteCartitemModalState'

function CartItem({ cartProduct }: { cartProduct: ProductWithCartAmount }) {
	const { mutate: removeFromCart } = useRemoveFromCart()
	const [confirmDeleteOpenState, setConfirmDeleteOpenState] =
		useRecoilState(isConfirmDeleteOpen)

	function removeProductFromCart(event: SyntheticEvent) {
		event.preventDefault()

		// setConfirmDeleteOpenState(true)
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
			<InfoWrapper>
				<section>
					<h3>{cartProduct.name}</h3>
					<button onClick={removeProductFromCart}>X</button>
				</section>
				<p>Amount in stock: {cartProduct.amount}</p>
			</InfoWrapper>
		</CartItemWrapper>
	)
}

export default CartItem

const CartItemWrapper = styled.li`
	display: grid;
	grid-template-columns: 2fr 3fr;
	border: 1px solid #9e9e9ef6;
	border-radius: ${(props) => props.theme.borderRadius};
	padding: 0.5rem;
	gap: 0.3rem;
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

const InfoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	section {
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
	}
`
