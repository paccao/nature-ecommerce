import isLoggedIn from '../../atoms/loggedInState'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

function AccountDetails() {
	const [loggedInState, _] = useRecoilState(isLoggedIn)
	const navigate = useNavigate()
	const submitHandler = () => {
		navigate('/login')
	}

	return (
		<Wrapper>
			{loggedInState ? (
				<article>Welcome back!</article>
			) : (
				<>
					<span>Welcome friend!</span>
					<button onClick={submitHandler}>Log in</button>
				</>
			)}
		</Wrapper>
	)
}

export default AccountDetails

const Wrapper = styled.div`
	margin: 0.5rem;
	display: flex;
	align-items: baseline;

	button {
		all: unset;

		margin-left: auto;
		cursor: pointer;
		padding: 0.3rem 0.7rem;
		font-size: 0.85em;
		background-color: ${(props) => props.theme.textColor};
		color: ${(props) => props.theme.__bgColorLargePageWidth};
		border-radius: ${(props) => props.theme.borderRadius};
		transition: all 0.2s;

		:hover {
			color: ${(props) => props.theme.accentColor};
		}
	}
`
