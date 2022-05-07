import React from 'react'
import styled from 'styled-components'
import useWidth from '../../hooks/useWidth'
import { lightTheme } from '../../themes/appTheme'
import MobileMenu from '../MobileMenu/MobileMenu'

type Props = {}

const Header: React.FC<Props> = (props) => {
	const width = useWidth()
	return (
		<HeaderWrapper>
			<nav>
				<a id="logo" href="/">
					Nature e-commerce
				</a>
				<a id="products" href="/products">
					Products
				</a>
				{width < 633 && <MobileMenu />}
			</nav>
		</HeaderWrapper>
	)
}

export default Header

const HeaderWrapper = styled.header`
	min-height: 10vh;
	padding: 1rem 0rem;
	margin-inline: 3rem;

	nav {
		display: flex;
		gap: 1rem;
		align-items: baseline;
		font-weight: 600;
		#logo {
			color: ${lightTheme.accentColor};
			font-size: 1.6em;
			margin-right: auto;
		}

		#products {
			font-size: 1.2em;
		}

		#products:hover {
			border-bottom-color: ${lightTheme.accentColor};
			color: ${lightTheme.accentColor};
		}
	}
`
