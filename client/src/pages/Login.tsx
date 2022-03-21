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
					<input type="email" name="email" />
					<input type="password" name="password" />
					<GenericButton {...{ innerText: 'Log in', type: 'submit' }} />
				</form>
			</section>
		</Wrapper>
	)
}

export default Login

const Wrapper = styled.div``
