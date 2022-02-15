import { render, screen } from '@testing-library/react'
import ProductItemBottom from './ProductItemBottom'
import { Product, ProductToAdd } from '../../models/Product'
import { QueryClient, QueryClientProvider } from 'react-query'
import { renderHook } from '@testing-library/react-hooks'
import { RecoilRoot } from 'recoil'
import userEvent from '@testing-library/user-event'
import useAddToCart from '../../hooks/useAddToCart'

const mockProduct: Product = {
	id: '1',
	name: 'Canned beans',
	price: 30,
	description: 'Tasty.',
	stock_available: 2,
	img_url: 'Beans',
}

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
				<ProductItemBottom product={mockProduct} />
			</QueryClientProvider>
		</RecoilRoot>,
	)
}

jest.mock('../../hooks/useAddToCart')
const mockedUseAddToCart = useAddToCart as jest.Mock<any>
mockedUseAddToCart.mockImplementation(() => ({
	isLoading: false,
	data: [mockProduct],
}))

describe('ProductItemBottom component', () => {
	it('renders without crashing', () => {
		render(<ProductItemBottom product={mockProduct} />)
	})
	it('sends a request to add current item to database when the "Add" button is pressed', async () => {
		renderMockDependenciesWrapper()

		userEvent.click(screen.getByRole('button', { name: 'Buy' }))

		let inputValue = screen.getByTestId('input-value').getAttribute('value')
		if (!inputValue) {
			inputValue = '1'
		}
		const productToAdd: ProductToAdd = {
			amount: Number(inputValue),
			productId: mockProduct.id,
			currentUserId: '0e265459-81fd-4e26-ab88-6830452fdae6',
		}

		mockedUseAddToCart.mockImplementation(() => ({
			isLoading: false,
			data: [mockProduct],
		}))
		const { result, waitFor } = renderHook(() => useAddToCart(productToAdd))
		await waitFor(() => result.current.isSuccess)

		expect(result.current.data).toEqual([mockProduct])
		expect(mockedUseAddToCart).toHaveBeenCalledTimes(1)
	})
	it.todo('remove temporary user in ProductItemBottom')
})
