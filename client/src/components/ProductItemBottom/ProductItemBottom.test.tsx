import { render, screen } from '@testing-library/react'
import ProductItemBottom from './ProductItemBottom'
import { Product } from '../../models/Product'

const mockProduct: Product = {
	id: '1',
	name: 'Canned beans',
	price: 30,
	description: 'Tasty.',
	stock_available: 2,
	img_url: 'Beans',
}

describe('ProductItemBottom component', () => {
	it('renders without crashing', () => {
		render(<ProductItemBottom product={mockProduct} />)
	})
})
