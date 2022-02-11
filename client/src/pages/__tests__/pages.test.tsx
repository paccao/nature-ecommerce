import { render, screen } from '@testing-library/react'
import Products from '../Products'
import Details from '../Details'
import Error404 from '../Error404'
import { QueryClient, QueryClientProvider } from 'react-query'

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
	it.todo('renders the search field')
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
