import React from 'react'
import styled from 'styled-components'

type Props = {
	innerText: string
}

function GenericButton({ innerText }: Props) {
	return <Button>{innerText}</Button>
}

export default GenericButton

const Button = styled.button`
	all: unset;

	padding: 0.3rem 0.8rem;
	background-color: ${(props) => props.theme.textColor};
	color: ${(props) => props.theme.__bgColorLargePageWidth};
	border-radius: ${(props) => props.theme.borderRadius};
`
