import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { Cart } from '../../models/Cart'
import CartAside from '../CartAside/CartAside'
import useCart from '../../hooks/useCart'
const { toBeInTheDocument } = require('@testing-library/jest-dom')

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({}),
	}),
) as jest.Mock

const renderMockDependenciesWrapper = () => {
	const queryClient = new QueryClient()
	render(
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<CartAside />
			</QueryClientProvider>
		</RecoilRoot>,
	)
}

const mockCart: Cart = [{}]

jest.mock('../../hooks/useCart')
const mockedUseCart = useCart as jest.Mock<any>
mockedUseCart.mockImplementation(() => ({
	data: mockCart,
}))

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
	it('renders the cart items', () => {
		renderMockDependenciesWrapper()
	})
})
