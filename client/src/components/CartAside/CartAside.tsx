import styled from 'styled-components'
import useCart from '../../hooks/useCart'
import useTotalCost from '../../hooks/useTotalCost'
import { Product, ProductWithCartAmount } from '../../models/Product'
import CartItem from './CartItem'
import currentTotalCost from '../../helpers/currentTotalCost'
import { useRecoilState } from 'recoil'
import isConfirmDeleteOpen from '../../atoms/confirmDeleteCartitemModalState'
import AccountDetails from './AccountDetails'

function CartAside() {
	const { data, isSuccess: isFetchCartSuccess } = useCart()
	const { data: totalCostResult } = useTotalCost()
	const [confirmDeleteState, useConfirmDeleteState] =
		useRecoilState(isConfirmDeleteOpen)

	return (
		<AsideWrapper>
			<section>
				<h2>Cart</h2>
				<AccountDetails />
				<ul>
					{data?.productsToMap.map((cartProduct) => (
						<CartItem key={cartProduct.id} cartProduct={cartProduct} />
					))}
				</ul>
				<div>
					<p data-testid="cart-total-cost">
						Total cost: {totalCostResult?.totalCost}
						kr.
					</p>
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

	section {
		ul {
			display: flex;
			flex-direction: column;
			gap: 0.5rem;
		}
	}
`
