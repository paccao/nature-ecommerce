import React from 'react'
import styled from 'styled-components'
import { lightTheme } from '../../themes/appTheme'
import GenericButton from '../global/GenericButton'

type Props = {}

const Header: React.FC<Props> = (props) => {
	return (
		<HeaderWrapper>
			<nav>
				<a id="logo" href="/">
					Nature e-commerce
				</a>
				<a id="products" href="/products">
					Products
				</a>
				<GenericButton type="button" innerText="Account" />
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
			font-size: 1.1em;
		}

		#products:hover {
			border-bottom-color: ${lightTheme.accentColor};
			color: ${lightTheme.accentColor};
		}
	}

	nav:last-child {
		font-size: 1.1em;
	}
`
