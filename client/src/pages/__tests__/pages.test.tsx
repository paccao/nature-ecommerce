import { render, screen } from '@testing-library/react'
import Products from '../Products'
import Details from '../Details'
import Error404 from '../Error404'

describe('tests for the different pages', () => {
	it('renders Products page without crashing', () => {
		render(<Products />)
	})
	it('renders Details page without crashing', () => {
		render(<Details />)
	})
	it('renders Error404 page without crashing', () => {
		render(<Error404 />)
	})
})
