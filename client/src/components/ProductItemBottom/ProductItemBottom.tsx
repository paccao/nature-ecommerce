import { SyntheticEvent, useState } from 'react'
import { Product } from '../../models/Product'
import GenericButton from '../global/GenericButton'
import styled from 'styled-components'
import useAddToCart from '../../hooks/useAddToCart'
import temporaryUser from '../../helpers/temporaryUser'
import AmountInputButtons from '../CartAside/CartItemInputButtons'

type Props = {
	product: Product
}

function ProductItemBottom({ product }: Props) {
	const [amountToAdd, setAmountToAdd] = useState<number>(1)
	const pushToCartArgs = {
		amount: amountToAdd,
		productId: product.id,
		currentUserId: temporaryUser,
	}

	const { mutate: pushToCart } = useAddToCart()

	function addProductItemToCart(event: SyntheticEvent) {
		event.preventDefault()
		pushToCart(pushToCartArgs)
	}

	const inputButtonsProps = {
		submitHandler: addProductItemToCart,
		amountToAddState: amountToAdd,
		setAmountToAddState: setAmountToAdd,
		buttonInnerText: 'Buy',
	}

	return (
		<Wrapper>
			<b>{`${product.price}kr`}</b>
			<AmountInputButtons {...inputButtonsProps} />
		</Wrapper>
	)
}

export default ProductItemBottom

const Wrapper = styled.div`
	display: flex;
	align-items: baseline;
	gap: 0.3rem;
	padding: 0.5rem 0rem;
	margin: 0rem 0.2rem;

	b {
		font-size: 0.9rem;
		cursor: default;
	}
`
