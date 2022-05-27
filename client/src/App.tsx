import styled, { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from 'styled-components'
import Products from './pages/Products'
import Login from './pages/Login'
import Error404 from './pages/Error404'
import { lightTheme } from './themes/appTheme'
import { Routes, Route, useLocation } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import isLoggedIn from './atoms/loggedInState'
import { useEffect } from 'react'
import Header from './components/Header/Header'
import useWindowPositionY from './hooks/useWindowPositionY'
import currentScrollYPosition from './atoms/scrollYPosition'
import GenericButton from './components/global/GenericButton'
import { CornerLeftUp } from 'react-feather'
import useWidth from './hooks/useWidth'
import { GlobalWidths } from './models/Global'
import menuOpenState from './atoms/menuOpenState'
import CartModal from './components/CartModal/CartModal'

const navigateToTop = () => {
	document.body.scrollTop = 0
	document.documentElement.scrollTop = 0
}

function App() {
	const [loggedInState, setLoggedInState] = useRecoilState(isLoggedIn)
	const [_, setScrollYPosition] = useRecoilState(currentScrollYPosition)
	const location = useLocation()
	const windowWidth = useWidth()

	const loggedIn: null | string = localStorage.getItem('login')
	const [isOpen, __] = useRecoilState(menuOpenState)

	useEffect(() => {
		if (loggedIn && !loggedInState) {
			setLoggedInState(true)
		}
	}, [])

	const scrollY = useWindowPositionY()

	useEffect(() => {
		setScrollYPosition(() => scrollY)
	}, [scrollY])

	return (
		<ThemeProvider theme={lightTheme}>
			<GlobalStyle />
			<Header />
			<AppWrapper className="App" isOpen={isOpen}>
				<main>
					<Routes>
						<Route path="/" element={<Products />} />
						<Route path="/login" element={<Login />} />
						<Route path="*" element={<Error404 />} />
					</Routes>
					{location.pathname === '/' &&
						windowWidth <= GlobalWidths.Tablet && (
							<GenericButton
								type="button"
								icon={<CornerLeftUp />}
								clickCallback={navigateToTop}
							/>
						)}
					{isOpen && windowWidth <= GlobalWidths.Tablet && (
						<CartModal />
					)}
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

const AppWrapper = styled.div<{ isOpen: boolean }>`
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
