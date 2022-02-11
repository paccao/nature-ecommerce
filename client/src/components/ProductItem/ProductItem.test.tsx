import { render, screen } from '@testing-library/react'
import { Product } from '../../models/Product'
import ProductItem from './ProductItem'
import { useProduct } from '../../hooks/useProduct'

const mockedUseProduct = useProduct as jest.Mock<unknown>

jest.mock('../../hooks/useProduct')
jest.mock('react-query')

const mockProduct: Product = {
	id: '1',
	name: 'Canned beans',
	price: 30,
	description: 'Tasty.',
	stock_available: 2,
	img_url: 'Beans',
}

describe('ProductItem component', () => {
	beforeEach(() =>
		mockedUseProduct.mockImplementation(() => ({ isLoading: true })),
	)
	afterEach(() => jest.clearAllMocks())
	it('renders without crashing', () => {
		render(<ProductItem product={mockProduct} />)
	})
	it('displays the correct data', () => {
		render(<ProductItem product={mockProduct} />)
		mockedUseProduct.mockImplementation(() => ({
			isLoading: false,
			data: mockProduct,
		}))

		const productName = screen.getByText('Canned beans')
		const productPrice = screen.getByText('30kr')
		const productDescription = screen.getByText('Tasty.')
		const productStockAvailable = screen.getByText('2')
		const productImgAlt = screen.getByAltText(
			'Picture of Canned beans product.',
		)
		const screenProduct = {
			productName,
			productPrice,
			productDescription,
			productStockAvailable,
			productImgAlt,
		}

		expect(screenProduct).toBeInTheDocument()
	})
})
