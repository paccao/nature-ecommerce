import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import useCart from '../../hooks/useCart'
import useTotalCost from '../../hooks/useTotalCost'
import AccountDetails from '../AccountDetails/AccountDetails'
import GenericButton from '../global/GenericButton'
import CartItem from './CartItem'

function CartAside() {
	const { data } = useCart()
	const { data: totalCostResult } = useTotalCost()

	function submitHandler(e: SyntheticEvent) {
		e.preventDefault()

		console.log('Items in cart purchased.')
	}

	return (
		<AsideWrapper>
			<AccountDetails />
			<section className="section-wrapper">
				<h2>Cart</h2>
				<ul className="cart-list">
					{data?.productsToMap.map((cartProduct) => (
						<CartItem key={cartProduct.id} cartProduct={cartProduct} />
					))}
				</ul>
				<form className="bottom" onSubmit={submitHandler}>
					<p data-testid="cart-total-cost">
						Total cost: {totalCostResult?.totalCost}
						kr.
					</p>
					<GenericButton {...{ innerText: 'Checkout', type: 'submit' }} />
				</form>
			</section>
		</AsideWrapper>
	)
}

export default CartAside

const AsideWrapper = styled.aside`
	background-color: #fff;
	height: 87vh;
	border-radius: ${(props) => props.theme.borderRadius};
	border-bottom-right-radius: ${(props) => props.theme.borderRadius};
	border-top-right-radius: ${(props) => props.theme.borderRadius};
	border: 2px solid #dcd3d3;
	padding: 0.2rem 0.8rem 0.3rem 0.8rem;
	margin-right: 1rem;

	.section-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;

		.cart-list {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}

		.bottom {
			padding: 0.7rem;
			margin-top: auto;
			height: 15%;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			p {
				font-size: 1em;
				font-weight: 400;
			}

			button {
				font-size: 1em;
				text-align: center;
			}
		}
	}
`
