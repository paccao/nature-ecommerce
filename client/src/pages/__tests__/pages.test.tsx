import { render } from '@testing-library/react'
import Products from '../Products'
import Details from '../Details'
import Error404 from '../Error404'
import { QueryClient, QueryClientProvider } from 'react-query'

describe('Products page component', () => {
	it('renders without crashing', () => {
		const queryClient = new QueryClient()
		render(
			<QueryClientProvider client={queryClient}>
				<Products />
			</QueryClientProvider>,
		)
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
