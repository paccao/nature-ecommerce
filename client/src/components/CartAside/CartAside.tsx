import styled from 'styled-components'
import useCart from '../../hooks/useCart'
import useTotalCost from '../../hooks/useTotalCost'
import GenericButton from '../global/GenericButton'
import CartItem from './CartItem'

function CartAside() {
	const { data } = useCart()
	const { data: totalCostResult } = useTotalCost()

	return (
		<AsideWrapper>
			<section className="section-wrapper">
				<h2>Cart</h2>
				<ul className="cart-list">
					{data?.productsToMap.map((cartProduct) => (
						<CartItem key={cartProduct.id} cartProduct={cartProduct} />
					))}
				</ul>
				<div className="bottom">
					<p data-testid="cart-total-cost">
						Total cost: {totalCostResult?.totalCost}
						kr.
					</p>
					<GenericButton {...{ innerText: 'Checkout', type: 'button' }} />
				</div>
			</section>
		</AsideWrapper>
	)
}

export default CartAside

const AsideWrapper = styled.aside`
	background-color: #fff;
	min-height: 87vh;
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
			display: grid;

			p {
				font-size: 1em;
				font-weight: 400;
			}

			button {
				text-align: center;
				margin: auto 0 0 auto;
			}
		}
	}
`
