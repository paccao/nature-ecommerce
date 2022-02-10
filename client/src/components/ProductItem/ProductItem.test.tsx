import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useCustomHook } from '../../hooks/reactQueryHooks'
import { Product } from '../../models/Product'
import ProductItem from './ProductItem'
import { renderHook } from '@testing-library/react-hooks'

const queryClient = new QueryClient()

type Props = {
	children: ReactNode
}
const wrapper = ({ children }: Props) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const mockProduct: Product = {
	id: '1',
	name: 'Canned beans',
	price: 30,
	description: 'Tasty.',
	stock_available: 2,
	img_url: 'Beans',
}

describe('ProductItem component', () => {
	it('renders without crashing', () => {
		render(<ProductItem product={mockProduct} />)
	})
	it('renders the relevant information about the product', async () => {
		render(<ProductItem product={mockProduct} />)

		const { result, waitFor } = renderHook(() => useCustomHook(mockProduct), {
			wrapper,
		})

		await waitFor(() => result.current.isSuccess)

		expect(result.current.data).toEqual(mockProduct)
	})
})
