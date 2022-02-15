import { useState } from 'react'
import { Product } from '../../models/Product'
import GenericButton from '../global/GenericButton'
import styled from 'styled-components'

type Props = {
	product: Product
}

function ProductItemBottom({ product }: Props) {
	return (
		<Wrapper>
			<b>{`${product.price}kr`}</b>
			<div className="input-group">
				<input
					type="button"
					value="-"
					className="button-minus cart-button"
					data-field="quantity"
				/>
				<input
					type="number"
					step="1"
					max="99"
					value="1"
					name="quantity"
					className="quantity-field"
					data-testid="input-value"
				/>
				<input
					type="button"
					value="+"
					className="button-plus cart-button"
					data-field="quantity"
				/>
			</div>
			<GenericButton innerText="Buy" />
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
		margin-left: auto;
		display: flex;
		max-width: 4rem;
		justify-content: space-around;
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
