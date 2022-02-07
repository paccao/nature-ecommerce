import { render, screen } from '@testing-library/react'
import HomePage from '../pages/HomePage'

describe('HomePage component', () => {
	it('renders without crashing', () => {
		render(<HomePage />)
	})
})
