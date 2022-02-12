import { render, screen, within } from '@testing-library/react'
const { toBeInTheDocument } = require('@testing-library/jest-dom')
import {
	queryAllByText,
	queryByText,
	waitFor,
	waitForElementToBeRemoved,
} from '@testing-library/dom'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'

import Products from '../Products'
import Details from '../Details'
import Error404 from '../Error404'

import { Product } from '../../models/Product'
import ProductItem from '../../components/ProductItem/ProductItem'
import { useProduct } from '../../hooks/useProduct'

const mockProducts: Product[] = [
	{
		id: '1',
		name: 'Canned beans',
		price: 30,
		description: 'Tasty.',
		stock_available: 2,
		img_url: 'placeholder beany img',
	},
	{
		id: '2',
		name: 'Fresh beans',
		price: 40,
		description: 'Mmm, tasty.',
		stock_available: 1,
		img_url: 'placeholder beany img',
	},
]

jest.mock('../../hooks/useProduct.tsx')
const mockedUseProduct = useProduct as jest.Mock<any>
mockedUseProduct.mockImplementation(() => ({
	isLoading: false,
	data: mockProducts,
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

	it('calls fetches database when input is submitted', () => {
		renderQueryClientWrapper()

		const searchFilter = /beans/

		userEvent.type(screen.getByRole('textbox'), searchFilter.toString())

		expect(screen.getByRole('textbox')).toHaveAttribute('onSubmit')
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
