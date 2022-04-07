import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Product, ProductWithCartAmount } from '../../models/Product'
import CartItem from './CartItem'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import CartAside from './CartAside'
import { BrowserRouter } from 'react-router-dom'

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({}),
	}),
) as jest.Mock

const mockProduct: ProductWithCartAmount = {
	id: '2',
	name: 'Worn boots',
	price: 300,
	description: 'Looks rugged.',
	stock_available: 5,
	amount: 2,
	img_url: 'Boots',
}

const queryClient = new QueryClient()
const renderMockDependenciesWrapper = () => {
	render(
		<BrowserRouter>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<CartAside />
				</QueryClientProvider>
			</RecoilRoot>
		</BrowserRouter>,
	)
}

const mockCartItem = () => {
	render(
		<BrowserRouter>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					<CartItem cartProduct={mockProduct}></CartItem>
				</QueryClientProvider>
			</RecoilRoot>
		</BrowserRouter>,
	)
}

describe('CartItem component', () => {
	it('renders without crashing', () => {
		mockCartItem()
	})

	it('removes a selected product from cart when the corresponding "X" button is pressed.', () => {
		renderMockDependenciesWrapper()
		mockCartItem()

		const removeButtonElement = screen.getByRole('button', { name: /x/i })
		userEvent.click(removeButtonElement)

		expect(screen.getByTestId('cart-total-cost')).toHaveTextContent(
			`Total cost: kr.`,
		)
	})
})
