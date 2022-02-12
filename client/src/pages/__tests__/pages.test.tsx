import { render, screen, within } from '@testing-library/react'
const { toBeInTheDocument } = require('@testing-library/jest-dom')
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'

import Products from '../Products'
import Details from '../Details'
import Error404 from '../Error404'

import { Product } from '../../models/Product'
import ProductItem from '../../components/ProductItem/ProductItem'
import { useProduct } from '../../hooks/useProduct'

const mockProduct: Product = {
	id: '1',
	name: 'Canned beans',
	price: 30,
	description: 'Tasty.',
	stock_available: 2,
	img_url: 'Beans',
}

jest.mock('../../hooks/useProduct.tsx')
const mockedUseProduct = useProduct as jest.Mock<any>
mockedUseProduct.mockImplementation(() => ({
	isLoading: false,
	data: mockProduct,
}))

global.fetch = jest.fn(() =>
	Promise.resolve({
		json: () => Promise.resolve({}),
	}),
) as jest.Mock

const renderQueryClientWrapper = () => {
	const queryClient = new QueryClient()
	render(
		<QueryClientProvider client={queryClient}>
			<Products />
		</QueryClientProvider>,
	)
}

describe('Products page component', () => {
	it('renders without crashing', () => {
		renderQueryClientWrapper()
	})

	it('renders the search field', () => {
		renderQueryClientWrapper()

		expect(screen.getByRole('search')).toBeInTheDocument()
	})

	it('should query the database when input has been submitted in the search field', () => {
		/** TODO:
		 * render query client wrapper
		 * render all mock products
		 * search for something
		 * check that only products with text that matches the search result is rendered
		 */
		renderQueryClientWrapper()

		// const mockedUseProduct = useProduct as jest.Mock<unknown>
		// jest.mock('../../hooks/useProduct.tsx')

		//TODO: Try get a list of all products, then filter, then get list of all products again => Compare them in the expect

		///
		// const searchFilter = /beans/

		// userEvent.type(screen.getByRole('textbox'), searchFilter.toString())
		// render(<ProductItem product={mockProduct} />)

		// const currentProducts = screen.getAllByText(searchFilter)
		// currentProducts.forEach((product) => {
		// 	expect(product).toBeInTheDocument()
		// })
		///

		// const currentProducts = screen.getAllByTestId('product-item')
		// currentProducts.forEach((product) => {
		// 	expect(within(product).getByText(searchFilter).nodeValue).toBe(
		// 		searchFilter,
		// 	)
		// })
	})

	it('renders the list container for the products', () => {
		renderQueryClientWrapper()

		expect(screen.getByRole('list')).toBeInTheDocument()
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

// 	const mockedUseProduct = useProduct as jest.Mock<unknown>
// 	jest.mock('../../hooks/useProduct')
// 	jest.mock('react-query')
// 	const mockProduct: Product = {
// 		id: '1',
// 		name: 'Canned beans',
// 		price: 30,
// 		description: 'Tasty.',
// 		stock_available: 2,
// 		img_url: 'Beans',
// 	}

// 	render(<ProductItem product={mockProduct} />)

// 	mockedUseProduct.mockImplementation(() => ({
// 		isLoading: false,
// 		data: mockProduct,
// 	}))
