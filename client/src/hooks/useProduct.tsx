import { useQuery } from 'react-query'
import { ProductResult } from '../models/Product'
import { fetchProducts } from '../helpers/fetchProducts'

export function useProduct() {
	return useQuery<ProductResult, Error>('product', () => fetchProducts(), {
		retry: false,
	})
}
