import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import CartAside from '../CartAside/CartAside'
import CartItem from '../CartAside/CartItem'
import useCart from '../../hooks/useCart'
import { Product } from '../../models/Product'
const { toBeInTheDocument } = require('@testing-library/jest-dom')

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({}),
	}),
) as jest.Mock
const queryClient = new QueryClient()
const renderMockDependenciesWrapper = () => {
	render(
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<CartAside />
			</QueryClientProvider>
		</RecoilRoot>,
	)
}

const mockProduct: Product = {
	id: '2',
	name: 'Worn boots',
	price: 300,
	description: 'Looks rugged.',
	stock_available: 5,
	img_url: 'Boots',
}

const mockCart: Product[] = [mockProduct]

jest.mock('../../hooks/useCart')
const mockedUseCart = useCart as jest.Mock<any>

describe('CartAside component', () => {
	mockedUseCart.mockImplementation(() => ({
		data: mockCart,
	}))
	it('renders without crashing', () => {
		renderMockDependenciesWrapper()
	})
	it.todo('should display: account name/signup/login')
	it.todo('should display account information')
	it.todo('sums up the total cost of all items in the cart')
	it('should display the cart', () => {
		renderMockDependenciesWrapper()

		const heading = screen.getByText('Cart')
		const totalCostElem = screen.getByTestId('order-info')
		const cartList = screen.getByRole('list')

		expect(heading).toBeInTheDocument()
		expect(totalCostElem).toBeInTheDocument()
		expect(cartList).toBeInTheDocument()
	})
	it('renders the cart items', () => {
		renderMockDependenciesWrapper()

		render(<CartItem cartProduct={mockProduct} />)

		expect(screen.getByTestId('cart-total-cost')).toHaveTextContent(
			`Total cost: ${mockProduct.price}kr.`,
		)
	})
})
