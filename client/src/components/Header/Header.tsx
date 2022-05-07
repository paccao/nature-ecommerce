import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import useWidth from '../../hooks/useWidth'
import { GlobalWidths } from '../../models/Global'
import { lightTheme } from '../../themes/appTheme'
import MobileMenu from '../MobileMenu/MobileMenu'

type Props = {}

const Header: React.FC<Props> = (props) => {
	const location = useLocation()
	const pageWidth = useWidth()
	return (
		<HeaderWrapper>
			<nav>
				<a id="logo" href="/">
					Nature e-commerce
				</a>
				<a id="products" href="/products">
					Products
				</a>
				{pageWidth < GlobalWidths.Mobile &&
					location.pathname === '/products' && <MobileMenu />}
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
		align-items: flex-end;
		font-weight: 600;
		#logo {
			color: ${lightTheme.accentColor};
			font-size: 1.6em;
			margin-right: auto;
		}

		#products {
			font-size: 1.35em;
			border-bottom: 2px solid ${lightTheme.textColor};
		}

		#products:hover {
			border-bottom-color: ${lightTheme.accentColor};
			color: ${lightTheme.accentColor};
		}
	}

	@media screen and (max-width: 491px) {
		#products {
			align-self: center;
		}
	}

	@media screen and (max-width: 390px) {
		margin-inline: 1rem;
	}
`
