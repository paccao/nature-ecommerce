import { SyntheticEvent } from 'react'
import styled from 'styled-components'
import useCart from '../../hooks/useCart'
import useTotalCost from '../../hooks/useTotalCost'
import AccountDetails from '../AccountDetails/AccountDetails'
import GenericButton from '../global/GenericButton'
import CartItem from '../CartAside/CartItem'
import CloseModalButton from '../CloseModalButton/CloseModalButton'

function CartModal() {
	const { data } = useCart()
	const { data: totalCostResult } = useTotalCost()

	function submitHandler(e: SyntheticEvent) {
		e.preventDefault()

		alert(
			'Items purchased. (Not really, this is a not a real web shop, sorry)',
		)
	}

	return (
		<Wrapper>
			<div className="innerWrapper">
				<section className="section-wrapper">
					<AccountDetails />
					<header>
						<h2>Cart</h2>
						<CloseModalButton />
					</header>
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
							{...{
								innerText: 'Checkout',
								type: 'submit',
							}}
						/>
					</form>
				</section>
			</div>
		</Wrapper>
	)
}

export default CartModal

const Wrapper = styled.div`
	background-color: #fff;
	min-height: 100vh;
	padding: 1rem 0.2rem 0.8rem 0.2rem;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;

	.section-wrapper {
		padding: 0rem 0.5rem;

		> header {
			margin-top: 0.5rem;
			margin-inline: 0.5rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.cart-list {
			overflow: auto;
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
			padding: 1rem 0rem;
		}

		.bottom {
			margin-top: auto;
			display: flex;
			align-items: flex-end;
			justify-content: space-between;
			min-height: auto;

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

	@media screen and (min-width: 500px) {
		.section-wrapper {
			width: 80%;
			margin-inline: auto;
		}
	}
`
