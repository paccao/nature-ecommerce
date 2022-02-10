import { render, screen } from '@testing-library/react'
import Products from '../Products'
import Details from '../Details'
import Error404 from '../Error404'

describe('Products page component', () => {
	it('renders without crashing', () => {
		render(<Products />)
	})
})

describe('Details page component', () => {
	it('renders without crashing', () => {
		render(<Details />)
	})
})

describe('Error404 page component', () => {
	it('renders without crashing', () => {
		render(<Error404 />)
	})
})
