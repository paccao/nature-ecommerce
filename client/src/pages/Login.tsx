import styled from 'styled-components'
import GenericButton from '../components/global/GenericButton'
import { useForm, SubmitHandler } from 'react-hook-form'
import useLogin from '../hooks/useLogin'

type Inputs = {
	username: string
	password: string
}

function Login() {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>()
	const { mutate: login } = useLogin()
	const onSubmit: SubmitHandler<Inputs> = (userCredentials) => {
		reset()
		if (!userCredentials) {
			console.error('Login credentials missing.')
			return
		}
		login(userCredentials)
	}

	return (
		<Wrapper>
			<section className="bottom">
				<h1>Welcome Back</h1>
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('username', {
							required: true,
							minLength: 3,
							maxLength: 20,
							pattern: /^[A-Za-z]{3,20}$/,
						})}
						placeholder="username"
					/>
					{errors.username && (
						<span>
							The username must be between 3 and 20 non-special
							characters.
						</span>
					)}
					<input
						{...register('password', {
							required: true,
							minLength: 4,
							maxLength: 50,
							pattern: /^[A-Za-z]{4,50}$/,
						})}
						placeholder="password"
					/>
					{errors.password && (
						<span>
							The password must be between 4 and 50 non-special
							characters.
						</span>
					)}
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
