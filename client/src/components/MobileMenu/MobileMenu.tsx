import React from 'react'
import styled from 'styled-components'

type Props = {}

const MobileMenu: React.FC<Props> = (props) => {
	return <MenuButton>📃</MenuButton>
}

const MenuButton = styled.button`
	all: unset;
	font-size: 1.3em;
`

export default MobileMenu
