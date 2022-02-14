import { render, screen } from '@testing-library/react'
import CartAside from '../CartAside/CartAside'

describe('CartAside component', () => {
	it('renders without crashing', () => {
		render(<CartAside />)
	})
})
