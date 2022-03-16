import GenericButton from '../global/GenericButton'
import { AmountInputButtonsProps, debounceProps } from '../../models/Global'
import styled from 'styled-components'
import { SyntheticEvent } from 'react'
import useDebounce from '../../hooks/useDebounce'

function CartItemInputButtons({
	submitHandler,
	amountToAddState,
	setAmountToAddState,
	buttonInnerText: buttonText,
}: AmountInputButtonsProps) {
	function formSubmitHandler(event: SyntheticEvent): void {
		event.preventDefault()
		submitHandler(event)
	}
	const useDebounceProps: debounceProps = {
		callback: submitHandler,
		delay: 300,
		dependencies: [amountToAddState],
	}

	useDebounce(useDebounceProps)

	return (
		<Form className="input-form" onSubmit={formSubmitHandler}>
			<div className="input-group">
				<input
					type="button"
					onClick={(_) =>
						setAmountToAddState((prevCount) =>
							prevCount <= 1 ? (prevCount = 99) : prevCount - 1,
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
					value={amountToAddState}
					onChange={(e) => {
						if (e.target.value.length <= 2) {
							setAmountToAddState(Number(e.target.value))
							e.target.value = Number(e.target.value).toString()
						}
					}}
					name="quantity"
					className="quantity-field"
					data-testid="input-value"
				/>
				<input
					type="button"
					onClick={(_) =>
						setAmountToAddState((prevCount) =>
							amountToAddState >= 99 ? (prevCount = 1) : prevCount + 1,
						)
					}
					value="+"
					className="button-plus cart-button"
					data-field="quantity"
				/>
			</div>
			{buttonText && <GenericButton innerText={buttonText} type="submit" />}
		</Form>
	)
}

export default CartItemInputButtons

const Form = styled.form`
	display: flex;
	margin-left: auto;
	justify-content: space-around;
	gap: 0.3rem;
	min-width: 50px;

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
