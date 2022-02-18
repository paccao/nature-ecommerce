import { render, screen } from '@testing-library/react'
import { Product } from '../../models/Product'
import CartItem from './CartItem'

const mockProduct: Product = {
	id: '2',
	name: 'Worn boots',
	price: 300,
	description: 'Looks rugged.',
	stock_available: 5,
	img_url: 'Boots',
}

describe('CartItem component', () => {
	it('renders without crashing', () => {
		render(<CartItem cartProduct={mockProduct} />)
	})
})
