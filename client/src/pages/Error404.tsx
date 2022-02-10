import React from 'react'
import styled from 'styled-components'

export default function Error404() {
	return (
		<Page404Container>
			<h1> 404</h1>
			<h2> Page Not Found</h2>
			<a href="/">Home page</a>
		</Page404Container>
	)
}

const Page404Container = styled.div`
	height: 100vh;
	border-radius: ${(props) => props.theme.borderRadius};
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`
