import styled, { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import Products from './pages/Products'
import Details from './pages/Details'
import Error404 from './pages/Error404'
import CartAside from './components/CartAside/CartAside'
import { lightTheme } from './themes/appTheme'
import { Routes, Route } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import isConfirmDeleteOpen from './atoms/confirmDeleteCartitemModalState'

function App() {
	const [confirmDeleteOpenState, setConfirmDeleteOpenState] =
		useRecoilState(isConfirmDeleteOpen)
	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyle />
			<AppWrapper className="App">
				<header>
					<a href="/">Nature e-commerce</a>
				</header>

				<main>
					{confirmDeleteOpenState ? (
						<article>
							<h2>Delete cart item?</h2>
							<p>Removes all of the selected products.</p>
						</article>
					) : null}
					<CartAside />
					<Routes>
						<Route path="/" element={<Products />} />
						<Route path="/product/:id" element={<Details />} />
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
		text-align: center;
		color: ${(props) => props.theme.accentColor};
		font-size: 1.4em;
		min-height: 10vh;
		padding: 1rem 0rem;
	}

	main {
		padding: 0rem 1rem 1rem 1rem;
		width: 100%;
		display: grid;
		grid-template-columns: 2fr 8fr;
		position: relative;
	}

	@media screen and (max-width: 780px) {
		main {
			grid-template-columns: 3fr 7fr;
		}
	}
`

export default App
