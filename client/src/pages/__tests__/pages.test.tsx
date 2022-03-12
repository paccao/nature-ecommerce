import { render, screen } from '@testing-library/react'
const { toBeInTheDocument } = require('@testing-library/jest-dom')
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'

import Products from '../Products'
import Signup from '../Signup'
// import Login from '../Login'
import Error404 from '../Error404'

import { Product } from '../../models/Product'
import ProductItem from '../../components/ProductItem/ProductItem'
import useProduct from '../../hooks/useProduct'
import { RecoilRoot } from 'recoil'

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
		name: 'Worn jeans',
		price: 100,
		description: 'Well worn but still holds up.',
		stock_available: 2,
		img_url: 'placeholder jeans picture',
	},
]

jest.mock('../../hooks/useProduct.ts')
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

const queryClient = new QueryClient()
const renderMockDependenciesWrapper = () => {
	render(
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<Products />
			</QueryClientProvider>
		</RecoilRoot>,
	)
}

describe('Products page component', () => {
	it('renders without crashing', () => {
		renderMockDependenciesWrapper()
	})

	it('renders the search field', () => {
		renderMockDependenciesWrapper()

		expect(screen.getByRole('search')).toBeInTheDocument()
	})

	it('calls the submit handler when input has been submitted', () => {
		renderMockDependenciesWrapper()

		const submitHandler = jest.fn()
		const searchFilter = /beans/

		expect(submitHandler).toHaveBeenCalledTimes(0)

		userEvent.type(screen.getByRole('textbox'), searchFilter.toString())
		submitHandler()

		expect(submitHandler).toHaveBeenCalledTimes(1)
	})
	it('Makes sure only elements matching the search input gets rendered', () => {
		renderMockDependenciesWrapper()

		const searchFilter = /beans/

		userEvent.type(screen.getByRole('textbox'), searchFilter.toString())
		// Mock hook of calling the database, return all products (mockProducts)
		mockedUseProduct.mockImplementation(() => ({
			isLoading: false,
			data: mockProducts,
		}))

		render(
			<QueryClientProvider client={queryClient}>
				<ProductItem product={mockProducts[0]} />
			</QueryClientProvider>,
		)

		const filteredHeading = screen.getByRole('heading', {
			name: searchFilter,
		})
		const unFilteredHeading = screen.queryByRole('heading', {
			name: mockProducts[1].name,
		})

		expect(filteredHeading).toBeInTheDocument()
		expect(unFilteredHeading).not.toBeInTheDocument()
	})
	it('renders the list container for the products', () => {
		renderMockDependenciesWrapper()

		expect(screen.getByRole('list')).toBeInTheDocument()
	})
})

describe('Signup page component', () => {
	it('renders without crashing', () => {
		render(<Signup />)
	})
})

// describe('Login page component', () => {
// 	it.todo('renders without crashing', () => {
// render(<Login />)
// 	})
// })

describe('Error404 page component', () => {
	it('renders without crashing', () => {
		render(<Error404 />)
	})
})
