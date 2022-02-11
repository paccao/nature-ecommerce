import { useQuery } from 'react-query'
import { Product } from '../models/Product'
import { fetchProducts } from '../helpers/fetchProducts'

export function useProduct() {
	return useQuery<Product[], Error>('product', () => fetchProducts(), {
		retry: false,
	})
}
