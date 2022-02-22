import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { Product } from '../../models/Product'
import CartItem from './CartItem'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import CartAside from './CartAside'

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({}),
	}),
) as jest.Mock

const mockProduct: Product = {
	id: '2',
	name: 'Worn boots',
	price: 300,
	description: 'Looks rugged.',
	stock_available: 5,
	img_url: 'Boots',
}

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

describe('CartItem component', () => {
	it('renders without crashing', () => {
		render(<CartItem cartProduct={mockProduct} />)
	})

	it('removes a selected product from cart when the corresponding "X" button is pressed.', () => {
		renderMockDependenciesWrapper()
		render(<CartItem cartProduct={mockProduct} />)

		const removeButtonElement = screen.getByRole('button', { name: /x/i })
		userEvent.click(removeButtonElement)

		expect(screen.getByTestId('cart-total-cost')).toHaveTextContent(
			`Total cost: 0kr.`,
		)
	})
})
