import { render, screen } from '@testing-library/react'
import HomePage from '../HomePage'
import ProductPage from '../ProductPage'
import ErrorPage404 from '../ErrorPage404'

describe('tests for the different pages', () => {
	it('renders HomePage without crashing', () => {
		render(<HomePage />)
	})
	it('renders HomePage without crashing', () => {
		render(<ProductPage />)
	})
	it('renders HomePage without crashing', () => {
		render(<ErrorPage404 />)
	})
})
