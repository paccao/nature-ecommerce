import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import useCart from '../../hooks/useCart'
import useHeight from '../../hooks/useHeight'
import useTotalCost from '../../hooks/useTotalCost'
import AccountDetails from '../AccountDetails/AccountDetails'
import GenericButton from '../global/GenericButton'
import CartItem from '../CartAside/CartItem'

function CartModal() {
	const { data } = useCart()
	const { data: totalCostResult } = useTotalCost()
	const windowHeight = useHeight()

	function submitHandler(e: SyntheticEvent) {
		e.preventDefault()

		console.log('Items in cart purchased.')
	}

	return (
		<Wrapper>
			<section className="section-wrapper">
				<AccountDetails />
				<h2>Cart</h2>
				<ul className="cart-list">
					{data?.productsToMap?.map((cartProduct) => (
						<CartItem
							key={cartProduct.id}
							cartProduct={cartProduct}
						/>
					))}
				</ul>
				<form className="bottom" onSubmit={submitHandler}>
					<p data-testid="cart-total-cost">
						Total cost: {totalCostResult?.totalCost || '0'}
						kr.
					</p>
					<GenericButton
						{...{ innerText: 'Checkout', type: 'submit' }}
					/>
				</form>
			</section>
		</Wrapper>
	)
}

export default CartModal

const Wrapper = styled.div`
	background-color: #fff;
	min-height: 87vh;
	border-radius: ${(props) => props.theme.borderRadius};
	border: 2px solid #dcd3d3;
	padding: 1rem 0.2rem 0.8rem 0.2rem;
	margin: 1rem;
	position: absolute;
	position: -webkit-absolute;
	.section-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding: 0rem 1.1rem;

		.cart-list {
			overflow: auto;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding: 1rem 0.7rem;
		}

		.bottom {
			margin-top: auto;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			min-height: auto;
			padding: 1.1rem 0rem 0rem 0rem;

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
