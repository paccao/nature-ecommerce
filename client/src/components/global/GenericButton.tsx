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
`
