import { useQuery } from 'react-query'
import { CartResult } from '../models/Cart'
import { pushToCart } from '../helpers/pushToCart'

export function useAddToCart() {
	return useQuery<CartResult, Error>('Add to cart', () => pushToCart(), {
		retry: false,
	})
}
