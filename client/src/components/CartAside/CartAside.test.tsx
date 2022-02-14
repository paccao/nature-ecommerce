import { render, screen } from '@testing-library/react'
import CartAside from '../CartAside/CartAside'
const { toBeInTheDocument } = require('@testing-library/jest-dom')

describe('CartAside component', () => {
	it('renders without crashing', () => {
		render(<CartAside />)
	})
	it.todo('should display: account name/signup/login')
	it.todo('should display account information')
	it('should display the cart', () => {
		render(<CartAside />)

		const heading = screen.getByText('Cart')
		const totalCostElem = screen.getByTestId('order-info')
		const cartList = screen.getByRole('list')

		expect(heading).toBeInTheDocument()
		expect(totalCostElem).toBeInTheDocument()
		expect(cartList).toBeInTheDocument()
	})
})
