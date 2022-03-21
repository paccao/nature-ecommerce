import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'
import GenericButton from '../components/global/GenericButton'

type Props = {}

function Login({}: Props) {
	function submitHandler(e: SyntheticEvent) {
		e.preventDefault()
	}
	return (
		<Wrapper>
			<section className="bottom">
				<h1>Welcome back</h1>
				<form onSubmit={submitHandler}>
					<input type="email" name="email" placeholder="email" />
					<input type="password" name="password" placeholder="password" />
					<GenericButton {...{ innerText: 'Log in', type: 'submit' }} />
				</form>
			</section>
		</Wrapper>
	)
}

export default Login

const Wrapper = styled.div`
	form {
		max-width: 500px;
		max-height: 250px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		input {
			all: unset;
			border-bottom: 2px solid #888;
			padding: 0.1rem 0.1rem 0.3rem 0.1rem;
		}

		input:hover,
		input:active,
		input:focus {
			border-bottom: 2px solid ${(props) => props.theme.accentColor};
			color: ${(props) => props.theme.accentColor};

			::placeholder {
				color: ${(props) => props.theme.accentColor};
			}
		}

		button {
			margin-top: 1rem;
			border-radius: 7px;
			background-color: ${(props) => props.theme.accentColor};
			font-size: 1em;
			font-weight: 500;
			text-align: center;
		}

		button:hover,
		button:active,
		button:focus {
			color: ${(props) => props.theme.textColor};
		}
	}
`
