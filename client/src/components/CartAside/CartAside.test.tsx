import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import CartAside from '../CartAside/CartAside'
import CartItem from '../CartAside/CartItem'
import useCart from '../../hooks/useCart'
import { Product, ProductWithCartAmount } from '../../models/Product'
import { BrowserRouter } from 'react-router-dom'
const { toBeInTheDocument } = require('@testing-library/jest-dom')

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({}),
	}),
) as jest.Mock
const queryClient = new QueryClient()
const renderMockDependenciesWrapper = () => {
	render(
		<BrowserRouter>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<CartAside />
				</QueryClientProvider>
			</RecoilRoot>
			,
		</BrowserRouter>,
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
const mockProductWithAmount: ProductWithCartAmount = {
	id: '2',
	name: 'Worn boots',
	price: 300,
	description: 'Looks rugged.',
	stock_available: 5,
	amount: 2,
	img_url: 'Boots',
}

const mockCart: Product[] = [mockProduct]

jest.mock('../../hooks/useCart')
const mockedUseCart = useCart as jest.Mock<any>

describe('CartAside component', () => {
	mockedUseCart.mockImplementation(() => ({
		data: {
			productsToMap: mockCart,
		},
	}))

	it('renders without crashing', () => {
		renderMockDependenciesWrapper()
	})
	it('sums up the total cost of all items currently rendered', () => {
		renderMockDependenciesWrapper()
		expect(screen.getByTestId('cart-total-cost')).toHaveTextContent(
			`Total cost: kr.`,
		)
	})
	it('should display the cart', () => {
		renderMockDependenciesWrapper()

		const heading = screen.getByText('Cart')
		const totalCostElem = screen.getByTestId('cart-total-cost')
		const cartList = screen.getByRole('list')

		expect(heading).toBeInTheDocument()
		expect(totalCostElem).toBeInTheDocument()
		expect(cartList).toBeInTheDocument()
	})
	it('renders the cart items', () => {
		renderMockDependenciesWrapper()

		render(
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<CartItem cartProduct={mockProductWithAmount}></CartItem>
				</QueryClientProvider>
			</RecoilRoot>,
		)
		expect(screen.getAllByRole('listitem')[0]).toBeInTheDocument()
	})
})
