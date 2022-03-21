import React from 'react'
import styled from 'styled-components'

export default function Error404() {
	return (
		<Page404Container>
			<h1> Oooops. 😲</h1>
			<h2> This page was not found.</h2>
			<a href="/">Home page</a>
		</Page404Container>
	)
}

const Page404Container = styled.div`
	height: 85vh;
	border-radius: ${(props) => props.theme.borderRadius};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	text-align: center;

	a {
		color: ${(props) => props.theme.accentColor};
	}
`
