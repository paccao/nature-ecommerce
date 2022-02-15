import { render, screen } from '@testing-library/react'
import ProductItemBottom from './ProductItemBottom'
import { Product } from '../../models/Product'
const { toBeInTheDocument } = require('@testing-library/jest-dom')
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import userEvent from '@testing-library/user-event'
import { useAddToCart } from '../../hooks/useAddToCart'

const mockProduct: Product = {
	id: '1',
	name: 'Canned beans',
	price: 30,
	description: 'Tasty.',
	stock_available: 2,
	img_url: 'Beans',
}

const renderMockDependenciesWrapper = () => {
	const queryClient = new QueryClient()
	render(
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<ProductItemBottom product={mockProduct} />
			</QueryClientProvider>
		</RecoilRoot>,
	)
}

jest.mock('../../hooks/useCart.tsx')
const mockedUseProduct = useAddToCart as jest.Mock<any>
mockedUseProduct.mockImplementation(() => ({
	isLoading: false,
	data: [mockProduct],
}))

describe('ProductItemBottom component', () => {
	it('renders without crashing', () => {
		render(<ProductItemBottom product={mockProduct} />)
	})
	it('sends a request to add current item to database when Add button is pressed', () => {
		renderMockDependenciesWrapper()
		// mockPostRequest with that number
		// Check that the mock has been called

		userEvent.click(screen.getByRole('button', { name: 'Buy' }))
		const inputValue = screen.getByTestId('input-value').getAttribute('value')
	})
})
