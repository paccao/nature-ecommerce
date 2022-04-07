import { render, screen } from '@testing-library/react'
const { toBeInTheDocument } = require('@testing-library/jest-dom')
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from 'react-query'

import Products from '../Products'
import Login from '../Login'
import Error404 from '../Error404'

import { Product } from '../../models/Product'
import ProductItem from '../../components/ProductItem/ProductItem'
import useProduct from '../../hooks/useProduct'
import { RecoilRoot } from 'recoil'
import { BrowserRouter } from 'react-router-dom'

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
	data: {
		productsToMap: mockProducts,
	},
}))

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
					<Products />
				</QueryClientProvider>
			</RecoilRoot>
		</BrowserRouter>,
	)
}

describe('Products page component', () => {
	mockedUseProduct.mockImplementation(() => ({
		isLoading: false,
		data: {
			productsToMap: mockProducts,
		},
	}))

	it('renders without crashing', () => {
		renderMockDependenciesWrapper()
	})
})

describe('Login page component', () => {
	it('renders without crashing', () => {
		render(
			<BrowserRouter>
				<RecoilRoot>
					<Login />
				</RecoilRoot>
			</BrowserRouter>,
		)
	})
})

describe('Error404 page component', () => {
	it('renders without crashing', () => {
		render(<Error404 />)
	})
})
