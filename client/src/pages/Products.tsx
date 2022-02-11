import { PageWrapper } from '../styles/PageWrapper.styles'
import { useProduct } from '../hooks/useProduct'

export default function Products() {
	const { data, isLoading, error } = useProduct()

	return (
		<PageWrapper>
			<h1>Products page🐳</h1>
		</PageWrapper>
	)
}
