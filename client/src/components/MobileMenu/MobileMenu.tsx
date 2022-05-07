import React from 'react'
import styled from 'styled-components'
import menuOpenState from '../../atoms/menuOpenState'
import menuActiveClassname from '../../atoms/menuActiveClassname'
import { useRecoilState } from 'recoil'
type Props = {}

const MobileMenu: React.FC<Props> = (props) => {
	const [isOpen, setIsOpen] = useRecoilState(menuOpenState)
	const [activeClassname, setActiveClassname] =
		useRecoilState(menuActiveClassname)

	const toggleMenu = (): void => {
		setIsOpen(() => !isOpen)
		setActiveClassname(() => (isOpen ? '' : 'active'))
	}

	return (
		<MenuButton className={`${activeClassname}`} onClick={toggleMenu}>
			<span>{isOpen ? '✖' : '📃'}</span>
		</MenuButton>
	)
}

const MenuButton = styled.button`
	all: unset;
	font-size: 1.3em;
	cursor: pointer;
`

export default MobileMenu
