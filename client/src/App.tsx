import styled, { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import LandingPage from './pages/LandingPage'
import Products from './pages/Products'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import { lightTheme } from './themes/appTheme'
import { Routes, Route } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import isLoggedIn from './atoms/loggedInState'
import { useEffect } from 'react'
import Header from './components/Header/Header'

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
				<Header />

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

	main {
		padding: 0rem 1rem 1rem 1rem;
		width: 100%;
		position: relative;
	}
`

export default App
