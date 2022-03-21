import styled from 'styled-components'
import GenericButton from '../components/global/GenericButton'

function Login() {
	return (
		<Wrapper>
			<section className="bottom">
				<h1>Welcome Back</h1>
				<form autoComplete="off">
					<input type="text" name="username" placeholder="username" />
					<input type="password" name="password" placeholder="password" />
					<GenericButton {...{ innerText: 'Log in', type: 'submit' }} />
				</form>
			</section>
		</Wrapper>
	)
}

export default Login

const Wrapper = styled.div`
	padding: 0rem 1rem 1rem 1rem;
	max-width: 1368px;
	min-height: 85vh;
	margin: 0 auto;
	display: flex;
	justify-content: center;
	align-items: center;

	h1 {
		width: min-content;
		font-weight: 500;
	}

	form {
		margin-top: 4rem;
		width: 18rem;
		max-height: 250px;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		input {
			all: unset;
			border-bottom: 2px solid #888;
			padding: 0.1rem 0.5rem 0.3rem 0.5rem;
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
			font-size: 1.07em;
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
