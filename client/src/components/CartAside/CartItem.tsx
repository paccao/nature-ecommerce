import { SyntheticEvent, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ProductWithCartAmount } from '../../models/Product'
import useRemoveFromCart from '../../hooks/useRemoveFromCart'
import temporaryUser from '../../helpers/temporaryUser'
import CartItemInputButtons from './CartItemInputButtons'
import useUpdateAmount from '../../hooks/useUpdateAmount'

function CartItem({ cartProduct }: { cartProduct: ProductWithCartAmount }) {
	const { mutate: removeFromCart } = useRemoveFromCart()
	const { mutate: updateAmount } = useUpdateAmount()

	const [amountToAdd, setAmountToAdd] = useState<number>(1)

	useEffect(() => {
		setAmountToAdd(() => cartProduct.amount)
	}, [cartProduct])

	function removeProductFromCart(event: SyntheticEvent) {
		event.preventDefault()

		removeFromCart({
			productIdToRemove: cartProduct.id,
			userId: temporaryUser,
		})
	}

	function handleChangeAmountSubmit() {
		updateAmount({
			productIdToUpdate: cartProduct.id,
			userId: temporaryUser,
			newAmount: amountToAdd,
		})
	}

	const inputButtonsProps = {
		submitHandler: handleChangeAmountSubmit,
		amountToAddState: amountToAdd,
		setAmountToAddState: setAmountToAdd,
		useSpecialSubmit: true,
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
				<div>
					<p>Amount in cart: </p>
					<CartItemInputButtons {...inputButtonsProps} />
				</div>
			</InfoWrapper>
		</CartItemWrapper>
	)
}

export default CartItem

const CartItemWrapper = styled.li`
	display: grid;
	grid-template-columns: 2fr 3fr;
	min-height: 8rem;
	border: 1px solid #9e9e9ef6;
	border-radius: ${(props) => props.theme.borderRadius};
	padding: 0.5rem;
	gap: 0.5rem;
`

const ImageWrapper = styled.div`
	position: relative;
	max-width: 100px;
	width: 100%;
	height: auto;
	align-self: center;
	display: flex;

	img {
		width: 100%;
		height: auto;
		max-height: 120px;
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

		button {
			all: unset;
			cursor: pointer;
			height: 20px;
			width: 20px;
			font-size: 1em;
			font-weight: 700;
			text-align: center;
			border-radius: 50%;
		}

		button:hover,
		button:focus {
			outline: 2px solid ${(props) => props.theme.accentColor};
		}
	}
	div {
		display: flex;
	}
`
