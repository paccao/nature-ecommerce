import styled, { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import Products from './pages/Products'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import CartAside from './components/CartAside/CartAside'
import { lightTheme } from './themes/appTheme'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyle />
			<AppWrapper className="App">
				<header>
					<a href="/">Nature e-commerce</a>
				</header>

				<main>
					<Routes>
						<Route path="/" element={<Products />} />
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
		text-align: center;
		color: ${(props) => props.theme.accentColor};
		font-size: 1.4em;
		font-weight: 600;
		min-height: 10vh;
		padding: 1rem 0rem;
	}

	main {
		padding: 0rem 1rem 1rem 1rem;
		width: 100%;
		position: relative;
	}
`

export default App
