import styled, { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import LandingPage from './pages/LandingPage'
import Products from './pages/Products'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import { lightTheme } from './themes/appTheme'
import { Routes, Route } from 'react-router-dom'
import GenericButton from './components/global/GenericButton'
import { useRecoilState } from 'recoil'
import isLoggedIn from './atoms/loggedInState'
import { useEffect } from 'react'

function App() {
	const [loggedInState, setLoggedInState] = useRecoilState(isLoggedIn)

	const loggedIn: null | string = localStorage.getItem('login')

	useEffect(() => {
		if (loggedIn && !loggedInState) {
			setLoggedInState(true)
		}
	}, [])
	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyle />
			<AppWrapper className="App">
				<header>
					<nav>
						<a id="logo" href="/">
							Nature e-commerce
						</a>
						<a id="products" href="/products">
							Products
						</a>
						<GenericButton type="button" innerText="Account" />
					</nav>
				</header>

				<main>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						<Route path="/products" element={<Products />} />
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
				</main>
			</AppWrapper>
		</ThemeProvider>
	)
}
const GlobalStyle = createGlobalStyle`
		html,body {
			background-color: ${lightTheme.bgColor};
		}
	`

const AppWrapper = styled.div`
	max-width: 1368px;
	min-height: 100vh;
	margin: 0 auto;

	header {
		min-height: 10vh;
		padding: 1rem 0rem;
		margin-inline: 3rem;

		nav {
			display: flex;
			gap: 1rem;
			align-items: baseline;
			font-weight: 600;
			#logo {
				color: ${(props) => props.theme.accentColor};
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
	}

	main {
		padding: 0rem 1rem 1rem 1rem;
		width: 100%;
		position: relative;
	}
`

export default App
