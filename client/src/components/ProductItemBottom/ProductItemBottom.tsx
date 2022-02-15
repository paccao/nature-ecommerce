import { SyntheticEvent, useState } from 'react'
import { Product, ProductToAdd } from '../../models/Product'
import GenericButton from '../global/GenericButton'
import styled from 'styled-components'
import useAddToCart from '../../hooks/useAddToCart'
import { pushToCart } from '../../helpers/pushToCart'

type Props = {
	product: Product
}

const temporaryUser = '0e265459-81fd-4e26-ab88-6830452fdae6'

function ProductItemBottom({ product }: Props) {
	// TODO: Refactor useState into an atom
	// move AddToCart POST req to GenericButton
	let [amountToAdd, setAmountToAdd] = useState<number>(1)

	async function addProductItemToCart(event: SyntheticEvent) {
		event.preventDefault()
		console.log('Submitted!')
		const itemAdded = await pushToCart({
			amount: amountToAdd,
			body: product,
			currentUserId: temporaryUser,
		})
		console.log(itemAdded)
	}

	return (
		<Wrapper>
			<b>{`${product.price}kr`}</b>
			<form className="input-form" onSubmit={addProductItemToCart}>
				<div className="input-group">
					<input
						type="button"
						onClick={(e) =>
							setAmountToAdd((prevCount) =>
								prevCount <= 1 ? (prevCount = 1) : prevCount - 1,
							)
						}
						value="-"
						className="button-minus cart-button"
						data-field="quantity"
					/>
					<input
						type="number"
						step="1"
						min="1"
						max="99"
						value={amountToAdd}
						onChange={(e) => {
							setAmountToAdd(Number(e.target.value))
						}}
						name="quantity"
						className="quantity-field"
						data-testid="input-value"
					/>
					<input
						type="button"
						onClick={(e) => setAmountToAdd((prevCount) => prevCount + 1)}
						value="+"
						className="button-plus cart-button"
						data-field="quantity"
					/>
				</div>
				<GenericButton innerText="Buy" type="submit" />
			</form>
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

	.input-form {
		display: flex;
		margin-left: auto;
		justify-content: space-around;
		gap: 0.3rem;
	}
	.input-group input {
		all: unset;
	}
	.input-group input[type='number'] {
		-webkit-appearance: textfield !important;
		-moz-appearance: textfield !important;
		appearance: textfield !important;
	}

	.input-group input[type='number']::-webkit-inner-spin-button,
	.input-group input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
	.input-group {
		display: flex;
		max-width: 4rem;
		border-radius: ${(props) => props.theme.borderRadius};
		border: 1px solid #dcd3d3;
		/* padding: 0rem 0.2rem; */
		line-height: 100%;

		.quantity-field {
			width: 60%;
			text-align: center;
			transition: all 0.2s;
		}
		.quantity-field:hover {
			color: ${(props) => props.theme.accentColor};
		}
		.cart-button {
			width: 20%;
			padding: 0.2rem 0.35rem;
			text-align: center;
			cursor: pointer;
			transition: all 0.2s;
		}
		.button-minus {
			border-top-left-radius: ${(props) => props.theme.borderRadius};
			border-bottom-left-radius: ${(props) => props.theme.borderRadius};
		}
		.button-plus {
			border-top-right-radius: ${(props) => props.theme.borderRadius};
			border-bottom-right-radius: ${(props) => props.theme.borderRadius};
		}
		.cart-button:hover {
			background-color: #f0f0f0;
		}
	}
`
