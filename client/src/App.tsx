import styled from 'styled-components'
import { ThemeProvider } from 'styled-components'
import HomePage from './pages/HomePage'
import { lightTheme } from './themes/appTheme'
import { Routes, Route } from 'react-router-dom'

function App() {
	return (
		<ThemeProvider theme={lightTheme}>
			<PageWrapper className="App">
				<header>Nature e-commerce</header>

				<main>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="*" element={<div>404 page</div>} />
					</Routes>
				</main>
			</PageWrapper>
		</ThemeProvider>
	)
}

const PageWrapper = styled.div`
	background-color: ${(props) => props.theme.bgColor};
	max-width: 980px;
	margin: 0 auto;

	min-height: 100vh;

	main {
		padding: 1rem;
		width: 100%;
		background-color: ${(props) => props.theme.bgColor};
	}
`

export default App
