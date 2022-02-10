import { useQuery } from 'react-query'
import { PageWrapper } from '../styles/PageWrapper.styles'
import { Product } from '../models/Product'
import { fetchProducts } from '../helpers/fetchProducts'

export default function Products() {
	const { data, isLoading, error } = useQuery<Product[]>(
		'products',
		fetchProducts,
	)

	return <PageWrapper>Products page🐳</PageWrapper>
}
