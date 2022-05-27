import React from 'react'
import styled from 'styled-components'
import menuOpenState from '../../atoms/menuOpenState'
import menuActiveClassname from '../../atoms/menuActiveClassname'
import { useRecoilState } from 'recoil'
import { X } from 'react-feather'
import { lightTheme } from '../../themes/appTheme'
type Props = {
	fixed?: boolean
}

const CloseModalButton: React.FC<Props> = (props) => {
	const [isOpen, setIsOpen] = useRecoilState(menuOpenState)
	const [activeClassname, setActiveClassname] =
		useRecoilState(menuActiveClassname)

	const toggleMenu = (): void => {
		setIsOpen(() => !isOpen)
		setActiveClassname(() => (isOpen ? '' : 'active'))
	}
	return (
		<MenuButton className={`${activeClassname}`} onClick={toggleMenu}>
			<X size="1.7em" color={lightTheme.textColor} />
		</MenuButton>
	)
}

const MenuButton = styled.button<Props>`
	all: unset;
	cursor: pointer;
	transform: translateY(4px);
`

export default CloseModalButton
