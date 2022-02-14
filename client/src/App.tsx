import styled, { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import Products from './pages/Products'
import Details from './pages/Details'
import Error404 from './pages/Error404'
import { lightTheme } from './themes/appTheme'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyle />
			<AppWrapper className="App">
				<header>
					<a href="/">Nature e-commerce LOGO</a>
				</header>

				<main>
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
	max-width: 980px;
	min-height: 100vh;
	margin: 0 auto;

	main {
		padding: 1rem;
		width: 100%;
	}
`

export default App
