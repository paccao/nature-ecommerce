import styled from 'styled-components'
import GenericButton from '../components/global/GenericButton'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useState } from 'react'
import isLoggedIn from '../atoms/loggedInState'
import loginUser from '../helpers/loginUser'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

type Inputs = {
	username: string
	password: string
}

type LoginSuccessOptions = 'true' | 'false' | 'not set'

function Login() {
	const {
		register,
		reset,
		handleSubmit,
		setFocus,
		formState: { errors },
	} = useForm<Inputs>()
	const [loginSuccess, setLoginSuccess] =
		useState<LoginSuccessOptions>('not set')
	const [loggedInState, setLoggedInState] = useRecoilState(isLoggedIn)
	const navigate = useNavigate()

	const onSubmit: SubmitHandler<Inputs> = async (userCredentials) => {
		if (!userCredentials) console.error('Login credentials missing.')
		userCredentials.username.trim()
		userCredentials.password.trim()

		const loginResult = await loginUser(userCredentials)

		reset()
		setFocus('username')
		if (loginResult.success === true) {
			setLoginSuccess('true')
			setLoggedInState(true)
			localStorage.setItem('login', 'true')

			navigate('/', { replace: true })
		} else if (loginResult.success === false) {
			setLoginSuccess('false')
			setLoggedInState(false)
		}
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
						autoFocus
					/>
					{errors.username && (
						<ErrorText>
							The username must be between 3 and 20 non-special
							characters.
						</ErrorText>
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
						<ErrorText>
							The password must be between 4 and 50 non-special
							characters.
						</ErrorText>
					)}
					{loginSuccess === 'false' && (
						<ErrorText>Incorrect credentials, try again.</ErrorText>
					)}
					<GenericButton
						{...{ innerText: 'Log in', type: 'submit' }}
					/>
				</form>
			</section>
		</Wrapper>
	)
}

export default Login

const ErrorText = styled.span`
	color: #ff0000b5;
`

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
