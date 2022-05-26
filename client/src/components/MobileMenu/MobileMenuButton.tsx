import React from 'react'
import styled from 'styled-components'
import menuOpenState from '../../atoms/menuOpenState'
import menuActiveClassname from '../../atoms/menuActiveClassname'
import { useRecoilState } from 'recoil'
import { ShoppingCart, X } from 'react-feather'
import { lightTheme } from '../../themes/appTheme'
type Props = {
	fixed?: boolean
}

const MobileMenuButton: React.FC<Props> = (props) => {
	const [isOpen, setIsOpen] = useRecoilState(menuOpenState)
	const [activeClassname, setActiveClassname] =
		useRecoilState(menuActiveClassname)

	const toggleMenu = (): void => {
		setIsOpen(() => !isOpen)
		setActiveClassname(() => (isOpen ? '' : 'active'))
	}
	return (
		<MenuButton className={`${activeClassname}`} onClick={toggleMenu}>
			{isOpen ? (
				<X size="1.7em" color={lightTheme.textColor} />
			) : (
				<ShoppingCart size="1.7em" color={lightTheme.textColor} />
			)}
		</MenuButton>
	)
}

const MenuButton = styled.button<Props>`
	all: unset;
	cursor: pointer;
	display: flex;
	align-self: flex-end;
	transform: translateY(3px);
	position: ${(props: Props) => (props.fixed ? 'fixed' : 'unset')};
	z-index: ${(props: Props) => (props.fixed ? 99 : 'unset')};
	top: ${(props: Props) => (props.fixed ? '4vh' : 'unset')};
	right: ${(props: Props) => (props.fixed ? '4vh' : 'unset')};

	@media screen and (max-width: 491px) {
		align-self: center;
	}
`

export default MobileMenuButton
